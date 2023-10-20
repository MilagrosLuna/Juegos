import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Encuesta } from 'src/app/clases/mensaje.interface';
import { AuthService } from 'src/app/servicios/auth.service';
@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss'],
})
export class EncuestaComponent implements OnInit {
  encuesta = {
    nombre: '',
    Apellido: '',
    edad: null,
    telefono: '',
    pregunta1: '',
    pregunta2: '',
    pregunta3: '',
  };
  form!: FormGroup;
  checkError: boolean = false;
  errorMessage: string = '';
  constructor(
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      Apellido: new FormControl('', [Validators.required]),
      edad: new FormControl('', [
        Validators.required,
        Validators.min(18),
        Validators.max(99),
      ]),
      telefono: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{1,10}$'),
      ]),
      pregunta1: new FormControl('', [Validators.required]),
      pregunta2: new FormControl('', [Validators.required]),
      pregunta3: new FormControl('', [Validators.required]),
    });
  }
  enviarEncuesta() {}
  onSubmit() {
    console.log(this.form.valid);
    console.log(this.form);
    if (this.form.valid) {
      Swal.fire({
        icon: 'success',
        title: 'Encuesta enviada',
        text: 'Encuesta enviada correctamente!! gracias por participar',
        showConfirmButton: false,
        timer: 1500,
      })
        .then(async () => {
          const encuesta = new Encuesta(
            this.form.controls['nombre'].value,
            this.form.controls['Apellido'].value,
            this.form.controls['edad'].value,
            this.form.controls['telefono'].value,
            this.form.controls['pregunta1'].value,
            this.form.controls['pregunta2'].value,
            this.form.controls['pregunta3'].value
          );
          const x = await this.authService.guardarEncuestaBD(encuesta);
          if (x) {
            this.form.reset();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error al enviar la Encuesta',
              text: this.errorMessage,
              timer: 4000,
            });
          }
        })
        .catch((error) => {
          this.errorMessage = error.message;
          Swal.fire({
            icon: 'error',
            title: 'Error al enviar la Encuesta',
            text: this.errorMessage,
            timer: 4000,
          });
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error complete todos los datos!!',
        timer: 2500,
      });
    }
  }
}
