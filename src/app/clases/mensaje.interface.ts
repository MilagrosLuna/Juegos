export interface Mensaje {
  emisor: string;
  texto: string;
  fecha: string;
}

export class Encuesta {
  nombre: string;
  apellido: string;
  edad: number;
  telefono: number;
  pregunta1: string;
  pregunta2: string;
  pregunta3: string;

  constructor(
    nombre: string,
    apellido: string,
    edad: number,
    telefono: number,
    pregunta1: string,
    pregunta2: string,
    pregunta3: string
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.telefono = telefono;
    this.pregunta1 = pregunta1;
    this.pregunta2 = pregunta2;
    this.pregunta3 = pregunta3;
  }
}

export class Juego {
  nombre: string;
  fecha: string;
  puntaje: number;
  juego: string;

  constructor(nombre: string, fecha: string, puntaje: number, juego: string) {
    this.nombre = nombre;
    this.fecha = fecha;
    this.puntaje = puntaje;
    this.juego = juego;
  }
}
