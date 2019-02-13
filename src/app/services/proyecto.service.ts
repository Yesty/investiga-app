import { IProyecto } from './../models/proyecto';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  private proyectoCollection: AngularFirestoreCollection<IProyecto>;
  private proyectos: Observable<IProyecto[]>;

  constructor(private db: AngularFirestore) {
    this.proyectoCollection = db.collection<IProyecto>('proyectos');

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


  getProyectoQuery(codigo: string) {
    return this.db.collection<IProyecto>('proyectos', s => s.where('codigo', '==', codigo)).snapshotChanges().pipe(
      map(action => {
        return action.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getProyecto = (id: string) => this.proyectoCollection.doc(id).valueChanges();
  updateProyecto = (proyecto: IProyecto, id: string) => this.proyectoCollection.doc(id).update(proyecto);
  addProyecto = (proyecto: IProyecto) => this.proyectoCollection.add(proyecto);
  deleteProyecto = (id: string) => this.proyectoCollection.doc(id).delete();

}
