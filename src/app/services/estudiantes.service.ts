import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Estudiante } from '../models/Estudiante';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {

  private estudiantesCollection: AngularFirestoreCollection<Estudiante>;
  private estudiantes: Observable<Estudiante[]>;

  constructor(private db: AngularFirestore) {
    this.estudiantesCollection = db.collection<Estudiante>('estudiantes');

    // Se consuluta el estado actual de los datos
    this.estudiantes = this.estudiantesCollection.snapshotChanges().pipe(
      map(action => {
        return action.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getEstudiantes() {
    this.estudiantes = this.estudiantesCollection.snapshotChanges().pipe(
      map(action => {
        return action.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

    return this.estudiantes;
  }

  getEstudianteQuery(codigo: string) {
    return this.db.collection('estudiantes', s => s.where('codigo', '==', codigo)).snapshotChanges().pipe(
      map(action => {
        return action.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
  getEstudiante = (id: string) => this.estudiantesCollection.doc(id).valueChanges();
  updateEstudiante = (estudiante: Estudiante, id: string) => this.estudiantesCollection.doc(id).update(estudiante);
  addEstudiante = (estudiante: Estudiante) => this.estudiantesCollection.add(estudiante);
  deleteEstudiante = (id: string) => this.estudiantesCollection.doc(id).delete();

}
