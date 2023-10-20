import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}


  logout(): void {
    // const confirmLogout = confirm(
    //   '¿Estás seguro de que deseas cerrar la sesión?'
    // );
    // if (confirmLogout) {
    //   // El usuario confirmó el cierre de sesión
    //   // Llama al servicio de autenticación para cerrar la sesión
    //   this.authService.logout();

    //   // Redirige al usuario a la página de inicio de sesión
    //   this.router.navigate(['/login']);
    // }

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: '¿Estás seguro de que deseas cerrar la sesión?',
        text: 'Deberas volver a ingresar!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, salir',
        cancelButtonText: 'No, cancelar',
        reverseButtons: true,
      })
      .then((result: any) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons
            .fire('Adios!', 'Cerrando sesión', 'success')
            .then(() => {
              this.authService.logout();
              // Redirige al usuario a la página de inicio de sesión
              this.router.navigate(['/login']);
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'Continuas navegando :)',
            'error'
          );
        }
      });
  }
}
