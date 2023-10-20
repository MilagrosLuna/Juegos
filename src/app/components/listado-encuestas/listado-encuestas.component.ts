import { Component } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-listado-encuestas',
  templateUrl: './listado-encuestas.component.html',
  styleUrls: ['./listado-encuestas.component.scss'],
})
export class ListadoEncuestasComponent {
  encuestas: any[] = [];
  constructor(private authService: AuthService) {}
  ngOnInit() {
    Swal.fire({
      icon: 'success',
      title: 'Encuestas',
      text: 'Cargando Resultados...',
      showConfirmButton: false,
      timer: 1500,
    })
      .then(async () => {
        const peliData = await this.authService.getEncuestas();
        console.log('Datos de las encuestas:', peliData);
        this.encuestas = peliData.map((encuesta) => {
          if (encuesta['pregunta1'] === 'opcion1') {
            encuesta['pregunta1'] = 'Me gusta el trabajo';
          } else if (encuesta['pregunta1'] === 'opcion2') {
            encuesta['pregunta1'] = 'No me gusto el trabajo';
          }
          switch (encuesta['pregunta3']) {
            case 'opcion1':
              encuesta['pregunta3'] = 'El preguntados';
              break;
            case 'opcion2':
              encuesta['pregunta3'] = 'El ahorcado';
              break;
            case 'opcion3':
              encuesta['pregunta3'] = 'El mayor o menor';
              break;
            case 'opcion4':
              encuesta['pregunta3'] = 'La ruleta rusa';
              break;
          }
          return encuesta;
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          timer: 4000,
        });
      });
  }
}
