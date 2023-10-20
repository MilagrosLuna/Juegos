import { Component } from '@angular/core';
import { Juego } from 'src/app/clases/mensaje.interface';
import { AuthService } from 'src/app/servicios/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-ruletarusa',
  templateUrl: './ruletarusa.component.html',
  styleUrls: ['./ruletarusa.component.scss'],
})
export class RuletarusaComponent {
  resultado: string = '';
  vidas: number = 3; // Número inicial de vidas
  muertes: number = 0;
  juegoTerminado: boolean = false;
  consecutivas: number = 0; // Número de veces seguidas que ha sobrevivido
  mensajeGanador: string =
    '¡Felicidades! Has sobrevivido tres veces seguidas. Eres el ganador. 🏆';
  puntuacion: number = 30;
  juegosJugados: number = 0; // Contador de juegos jugados

  constructor(private authService: AuthService) {}

  jugar() {
    if (this.juegoTerminado || this.juegosJugados >= 3) {
      return;
    }

    const esAcierto = Math.random() < 0.1666666666666667;
    if (esAcierto && this.vidas > 0) {
      this.resultado = '¡Has sobrevivido! 🎉';
      this.consecutivas++;
      if (this.consecutivas >= 3) {
        this.mostrarMensajeGanador();
      }
    } else if (this.vidas > 0) {
      this.resultado = '¡Oh no! La ruleta rusa ha cobrado una vida... 💥💀';
      this.vidas--;
      this.muertes++;
      this.puntuacion -= 10;
      this.consecutivas = 0;
      if (this.muertes >= 3) {
        this.juegoTerminado = true;
      }
    }

    if (this.juegoTerminado || this.juegosJugados >= 2) {      
      this.guardarPuntuacion();
      Swal.fire({
        title: 'Juego terminado',
        text:
          'Has jugado tres veces. Tu puntuación final es: ' +
          this.puntuacion +
          ' ¿Deseas reiniciar el juego?',
        icon: 'info',
        confirmButtonText: 'Reiniciar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.reiniciarJuego();
        }
      });
    } else {
      this.juegosJugados++; // Incrementar el contador de juegos jugados
    }
  }
  async guardarPuntuacion() {
    const dateDay = this.obtenerFecha();
    try {
      const username: any = await this.authService.getCurrentUser();
      if (username) {
        const name = username.email;
        const juego = new Juego(name, dateDay, this.puntuacion,'Ruleta rusa');
        await this.authService.guardarResultadoJuegoBD(juego);
      } else {
        console.log('No se pudo obtener el usuario.');
      }
    } catch (error) {
      console.error('Error al guardar la puntuación:', error);
    }
  }
  obtenerFecha(): string {
    let ahora = new Date();
    let dia = ahora.getDate();
    let mes = ahora.getMonth() + 1;
    let año = ahora.getFullYear();
    let horas = ahora.getHours();
    let minutos = ahora.getMinutes();
    let segundos = ahora.getSeconds();
    let diaStr = dia < 10 ? '0' + dia.toString() : dia.toString();
    let mesStr = mes < 10 ? '0' + mes.toString() : mes.toString();
    let segSrt =
      segundos < 10 ? '0' + segundos.toString() : segundos.toString();
    let minStr = minutos < 10 ? '0' + minutos.toString() : minutos.toString();
    let fechaFormateada = `${diaStr}/${mesStr}/${año} ${horas}:${minStr}:${segSrt}`;

    return fechaFormateada;
  }
  mostrarMensajeGanador() {
    Swal.fire('¡Ganaste!', this.mensajeGanador, 'success').then((result) => {
      if (result.isConfirmed) {
        this.reiniciarJuego();
      }
    });
  }

  reiniciarJuego() {
    this.vidas = 3;
    this.muertes = 0;
    this.resultado = '';
    this.puntuacion = 30;
    this.juegoTerminado = false;
    this.juegosJugados = 0; // Reiniciar el contador de juegos jugados
  }
}
