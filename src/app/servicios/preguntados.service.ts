import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pregunta } from '../clases/pregunta.interface';
@Injectable({
  providedIn: 'root',
})
export class PreguntadosService {
  constructor(private httpCliente: HttpClient) {}

  getPreguntaAPI(): Observable<Pregunta> {
    return this.httpCliente.get(
      'https://opentdb.com/api.php?amount=1'
    ) as Observable<Pregunta>;
  }
}
