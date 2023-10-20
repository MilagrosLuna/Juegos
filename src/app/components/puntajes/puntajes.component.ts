import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Juego } from 'src/app/clases/mensaje.interface';

@Component({
  selector: 'app-puntajes',
  templateUrl: './puntajes.component.html',
  styleUrls: ['./puntajes.component.scss']
})
export class PuntajesComponent {
  puntuaciones: Juego[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.obtenerPuntuaciones();
  }

  async obtenerPuntuaciones() {
    try {
      this.puntuaciones = await this.authService.getPuntuaciones();
    } catch (error) {
      console.error('Error al obtener las puntuaciones:', error);
    }
  }
}
