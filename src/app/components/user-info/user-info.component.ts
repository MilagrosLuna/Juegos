import { Component } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent {
  constructor(private authService: AuthService) {}

  usuario: any;

  ngOnInit(): void {
    this.authService
      .getCurrentUser()
      .then((user) => {
        this.usuario = user;
        console.log(this.usuario);
      })
      .catch((error) => {
        console.error('Ocurrió un error al obtener el usuario:', error);
      });
  }

  formatearFecha(fechaGMT: string): string {
    let fecha = new Date(fechaGMT);
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1;
    let ano = fecha.getFullYear();

    let diaStr = dia < 10 ? '0' + dia.toString() : dia.toString();
    let mesStr = mes < 10 ? '0' + mes.toString() : mes.toString();

    return diaStr + '/' + mesStr + '/' + ano;
  }
}
