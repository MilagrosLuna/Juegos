import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  checkError: boolean = false;
  errorMessage: string = '';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService
        .login(this.form.value)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            text: 'bienvenido',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.router.navigate(['/home']);
          });
        })
        .catch((error) => {
          this.checkError = true;
          switch (error.code) {
            case 'auth/invalid-email':
            case 'auth/user-not-found':
            case 'auth/wrong-password':
            case 'auth/internal-error':
            case 'auth/too-many-requests':
            case 'auth/invalid-login-credentials':
              this.errorMessage = `Credenciales inválidas`;
              break;
            default:
              this.errorMessage = error.message;
              break;
          }
          Swal.fire({
            icon: 'error',
            title: 'Error de inicio de sesión',
            text: this.errorMessage,
            timer: 4000,
          });
        });
    }
  }
  goToRegister(): void {
    this.router.navigate(['/register']);
  }
  autoLogin() {
    this.form.controls['email'].setValue(this.authService.demoUser.email);
    this.form.controls['password'].setValue(this.authService.demoUser.password);
  } 
}
