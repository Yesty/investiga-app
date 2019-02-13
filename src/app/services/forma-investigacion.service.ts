import { IFormaInvestigacion } from './../models/forma-investigacion';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormaInvestigacionService {

  private formaInvestigacionCollection: AngularFirestoreCollection<IFormaInvestigacion>;
  private formaInvestigacion: Observable<IFormaInvestigacion[]>;

  constructor(private db: AngularFirestore) {
    this.formaInvestigacionCollection = db.collection<IFormaInvestigacion>('formasInvestigacion');

    // Se consuluta el estado actual de los datos
    this.formaInvestigacion = this.formaInvestigacionCollection.snapshotChanges().pipe(
      map(action => {
        return action.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getFormasInvestigacion() {
    this.formaInvestigacion = this.formaInvestigacionCollection.snapshotChanges().pipe(
      map(action => {
        return action.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

    return this.formaInvestigacion;
  }

  getFormaInvestigacion = (id: string) => this.formaInvestigacionCollection.doc(id).valueChanges();
  addFormaInvestigacion = (formaInvestigacion: IFormaInvestigacion) => this.formaInvestigacionCollection.add(formaInvestigacion);
  deleteFormaInvestigacion = (id: string) => this.formaInvestigacionCollection.doc(id).delete();
}
