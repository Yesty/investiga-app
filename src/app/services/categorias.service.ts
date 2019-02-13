import { ICategoria } from './../models/categoria';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private categoriaCollection: AngularFirestoreCollection<ICategoria>;
  private categorias: Observable<ICategoria[]>;

  constructor(private db: AngularFirestore) {
    this.categoriaCollection = db.collection<ICategoria>('categorias');

    // Se consuluta el estado actual de los datos
    this.categorias = this.categoriaCollection.snapshotChanges().pipe(
      map(action => {
        return action.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getCategorias() {
    this.categorias = this.categoriaCollection.snapshotChanges().pipe(
      map(action => {
        return action.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

    return this.categorias;
  }

  getCategoria = (id: string) => this.categoriaCollection.doc(id).valueChanges();
  addCategoria = (categoria: ICategoria) => this.categoriaCollection.add(categoria);
  deleteCategoria = (id: string) => this.categoriaCollection.doc(id).delete();

}
