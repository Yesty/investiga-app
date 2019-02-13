import { IProyecto } from './../../models/proyecto';
import { IEstudiante } from './../../models/estudiante';
import { EstudiantesService } from 'src/app/services/estudiantes.service';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  estudiante: IEstudiante = {
    apellido: '',
    carrera: null,
    codigo: '',
    correo: '',
    documento: '',
    estado: true,
    fechaCreacion: 0,
    fechaModificacion: 0,
    fechaNacimiento: 0,
    nombre: '',
    proyectos: new Array<IProyecto>(),
    telefono: ''
  };
  codigoEstudiante: string;
  idEstudiante: string;

  constructor(
    private storage: Storage,
    private estudiantService: EstudiantesService,
  ) {
    this.storage.get('auth-token').then((val: any) => {
      this.codigoEstudiante = val[0].codigo;

      this.estudiantService.getEstudianteQuery(this.codigoEstudiante).subscribe(res => {
         this.idEstudiante = res[0].id;
        this.estudiante = <IEstudiante>res[0];
      });
    });
  }
}
