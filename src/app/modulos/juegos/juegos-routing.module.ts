import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegosComponent } from './juegos.component';
import { AhorcadoComponent } from 'src/app/components/ahorcado/ahorcado.component';
import { PreguntadosComponent } from 'src/app/components/preguntados/preguntados.component';  
import { RuletarusaComponent } from 'src/app/components/ruletarusa/ruletarusa.component';
import { MayormenorComponent } from 'src/app/components/mayormenor/mayormenor.component';
const routes: Routes = [
  {
    path: '',
    component: JuegosComponent,
    children: [
      { path: 'mayorMenor', component: MayormenorComponent },
      { path: 'ahorcado', component: AhorcadoComponent },          
      { path: 'preguntados', component: PreguntadosComponent },          
      { path: 'ruleta', component: RuletarusaComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JuegosRoutingModule {}
