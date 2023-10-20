import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User,
} from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from '@angular/fire/firestore';
import { Encuesta, Juego } from '../clases/mensaje.interface';
import { initializeApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  demoUser = {
    email: 'milivictoria2004@gmail.com',
    password: '123456',
  };
  db: Firestore;
  constructor(private auth: Auth) {
    this.db = getFirestore();
    initializeApp(environment.firebase);
  }
  async register({ email, password, nick }: any) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: nick });
      return user;
    } catch (error) {
      throw error;
    }
  }
  getCurrentUserName(): string | null {
    const user = this.auth.currentUser;
    return user ? user.displayName : null;
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  getCurrentUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged(
        (user) => {
          resolve(user);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  public async isUserLoggedIn(): Promise<boolean> {
    return new Promise((resolve) => {
      onAuthStateChanged(this.auth, (user: User | null) => {
        resolve(!!user); // Devuelve true si hay un usuario, false si no hay usuario.
      });
    });
  }

  logout() {
    return signOut(this.auth);
  }

  public async guardarEncuestaBD(encuesta: Encuesta) {
    try {
      const docRef = await addDoc(collection(this.db, 'encuestas'), {
        nombre: encuesta.nombre,
        apellido: encuesta.apellido,
        edad: encuesta.edad,
        telefono: encuesta.telefono,
        pregunta1: encuesta.pregunta1,
        pregunta2: encuesta.pregunta2,
        pregunta3: encuesta.pregunta3,
      });
      console.log('Document written with ID: ', docRef.id);
      return true;
    } catch (e) {
      console.error('Error adding document: ', e);
      return false;
    }
  }

  public async getEncuestas() {
    const peliculasCollection = collection(this.db, 'encuestas');
    const query = await getDocs(peliculasCollection);
    const peliculas = query.docs.map((doc) => doc.data());
    return peliculas;
  }

  public async guardarResultadoJuegoBD(juego: Juego) {
    try {
      const docRef = await addDoc(collection(this.db, 'juegos'), {
        nombre: juego.nombre,
        fecha: juego.fecha,
        puntaje: juego.puntaje,
        juego:juego.juego
      });
      console.log('Document written with ID: ', docRef.id);
      return true;
    } catch (e) {
      console.error('Error adding document: ', e);
      return false;
    }
  }
  
  public async getPuntuaciones(): Promise<Juego[]> {
    try {
      const juegosCollection = collection(this.db, 'juegos');
      const query = await getDocs(juegosCollection);
      const puntuaciones = query.docs.map((doc) => {
        const data = doc.data();
        return {
          nombre: data['nombre'],
          fecha: data['fecha'],
          puntaje: data['puntaje'],
          juego: data['juego'],
        };
      });
      return puntuaciones;
    } catch (e) {
      console.error('Error al obtener las puntuaciones:', e);
      return [];
    }
  }
  
}
