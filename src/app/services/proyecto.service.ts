import { Proyecto } from './../models/proyecto';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  private proyectoCollection: AngularFirestoreCollection<Proyecto>;
  private proyectos: Observable<Proyecto[]>;

  constructor(private db: AngularFirestore) {
    this.proyectoCollection = db.collection<Proyecto>('proyectos');

    // Se consuluta el estado actual de los datos
    this.proyectos = this.proyectoCollection.snapshotChanges().pipe(
      map(action => {
        return action.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getProyectos() {
    this.proyectos = this.proyectoCollection.snapshotChanges().pipe(
      map(action => {
        return action.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

    return this.proyectos;
  }

  getProyecto = (id: string) => this.proyectoCollection.doc(id).valueChanges();
  updateProyecto = (proyecto: Proyecto, id: string) => this.proyectoCollection.doc(id).update(proyecto);
  addProyecto = (proyecto: Proyecto) => this.proyectoCollection.add(proyecto);
  deleteProyecto = (id: string) => this.proyectoCollection.doc(id).delete();

}
