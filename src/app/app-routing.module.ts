import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { ChatComponent } from './components/chat/chat.component';
import { MayormenorComponent } from './components/mayormenor/mayormenor.component';
import { AhorcadoComponent } from './components/ahorcado/ahorcado.component';
import { PreguntadosComponent } from './components/preguntados/preguntados.component';
import { RuletarusaComponent } from './components/ruletarusa/ruletarusa.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { ListadoEncuestasComponent } from './components/listado-encuestas/listado-encuestas.component';
import { activateGuard } from './guards/activate.guard';
import { PuntajesComponent } from './components/puntajes/puntajes.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'userInfo', pathMatch: 'full' },
      { path: 'aboutMe', component: AboutMeComponent },
      { path: 'userInfo', component: UserInfoComponent },
      {
        path: 'juegos',
        loadChildren: () =>
          import('./modulos/juegos/juegos.module').then((m) => m.JuegosModule),
      },
      { path: 'chat', component: ChatComponent },
      { path: 'encuesta', component: EncuestaComponent },
      { path: 'puntuaciones', component: PuntajesComponent },
      {
        path: 'listadoEncuesta',
        component: ListadoEncuestasComponent,
        canActivate: [activateGuard],
      },
    ],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'juegos',
    loadChildren: () =>
      import('./modulos/juegos/juegos.module').then((m) => m.JuegosModule),
  },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
