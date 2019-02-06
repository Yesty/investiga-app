import { Usuario } from './../models/usuario';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuariosCollection: AngularFirestoreCollection<Usuario>;
  private usuarios: Observable<Usuario[]>;

  constructor(private db: AngularFirestore) {
    this.usuariosCollection = db.collection<Usuario>('usuarios');

    // Se consuluta el estado actual de los datos
    this.usuarios = this.usuariosCollection.snapshotChanges().pipe(
      map(action => {
        return action.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  /**
   * Validas las credenciales de usuario para sun ingreso a la aplicacion
   * @param codigo Codigo de usuario - string
   * @param documento Docuemento de usuario - string
   */
  getLogin(codigo: string, documento: string) {
    return this.db.collection<Usuario>('usuarios', ref => ref.where('codigo', '==', codigo).where('documento', '==', documento));
  }

  /**
   * Permite la adicion de nuevos usuarios
   *
   * @memberof UsuarioService
   */
  addUsuario = (usuario: Usuario) => this.usuariosCollection.add(usuario);

}
