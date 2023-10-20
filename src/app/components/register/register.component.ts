import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  errorCheck: boolean = false;
  Message: string = '';
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      nick: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  onSubmit() {
    if (this.form.valid) {
      console.log(this.form);
      this.authService
        .register(this.form.value)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: '¡Bienvenido!',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.router.navigate(['/home']);
          });
        })
        .catch((error) => {
          this.errorCheck = true;
          console.log(error.code);
          switch (error.code) {
            case 'auth/email-already-in-use':
              this.Message =
                'Ya se encuentra un usuario registrado con ese email';
              break;
            default:
              this.Message = 'Hubo un problema al registrar.';
              break;
          }
          Swal.fire({
            icon: 'error',
            title: 'Error al registrar',
            text: this.Message,
            timer: 4000,
          });
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Complete los datos para registrar',
        text: 'Complete TODOS los datos requeridos.',
        timer: 4000,
      });
    }
  }
  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
