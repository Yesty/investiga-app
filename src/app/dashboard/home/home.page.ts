import { EstudiantesService } from 'src/app/services/estudiantes.service';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  estudiante: any;
  codigoEstudiante: string;

  constructor(
    private storage: Storage,
    private estudiantService: EstudiantesService,
  ) {
    this.storage.get('auth-token').then((val: any) => {
      this.codigoEstudiante = val[0].codigo;

      this.estudiantService.getEstudianteQuery(this.codigoEstudiante).subscribe(res => {
        console.log(res);
        this.estudiante = res;
      });
    });
  }
}
