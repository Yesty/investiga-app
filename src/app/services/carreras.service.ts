import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ICarrera } from '../models/carrera';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {

  private carrerasCollection: AngularFirestoreCollection<ICarrera>;
  private carreras: Observable<ICarrera[]>;

  constructor(private db: AngularFirestore) {
    this.carrerasCollection = db.collection<ICarrera>('carreras');
  }

  /**
   * Devuelve o establece el listado correspondiente a las carreras existentes en base de datos
   */
  getCarreras() {
    this.carreras = this.carrerasCollection.snapshotChanges().pipe(
      map(action => {
        return action.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

    return this.carreras;
  }
}
