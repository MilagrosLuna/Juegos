import { Component } from '@angular/core';
import { GithubService } from 'src/app/servicios/github.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent {
  userData: any;

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    // Llama al servicio para obtener los datos del usuario
    this.githubService.getUserInfo('MilagrosLuna').subscribe((data) => {
      this.userData = data;
    });
  }
}
