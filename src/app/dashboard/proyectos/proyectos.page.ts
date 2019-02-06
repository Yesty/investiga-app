import { FormaInvestigacionService } from './../../services/forma-investigacion.service';
import { EstudiantesService } from './../../services/estudiantes.service';
import { Estudiante } from 'src/app/models/estudiante';
import { Categoria } from './../../models/categoria';
import { FormaInvestigacion } from './../../models/forma-investigacion';
import { Proyecto } from './../../models/proyecto';
import { LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ProyectoService } from './../../services/proyecto.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.page.html',
  styleUrls: ['./proyectos.page.scss'],
})
export class ProyectosPage implements OnInit {

  proyecto: Proyecto;
  proyectoCodigo: string = null;
  titulo: string;
  formasInvestigacion: FormaInvestigacion[];
  categorias: Categoria[];
  estudiante: any;
  codigoEstudiante: string;

  constructor(
    private proyectoService: ProyectoService,
    private estudiantService: EstudiantesService,
    private formasInvestigacionservice: FormaInvestigacionService,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private nav: NavController,
    private storage: Storage,
  ) {
    this.proyecto = new Proyecto();

    this.storage.get('auth-token').then((val: any) => {
      this.codigoEstudiante = val[0].codigo;

      this.estudiantService.getEstudianteQuery(this.codigoEstudiante).subscribe(res => {
        this.estudiante = res;
      });
    });

    this.formasInvestigacionservice.getFormasInvestigacion().subscribe(res => {
      this.formasInvestigacion = res;
    });
  }

  ngOnInit() {
    this.proyectoCodigo = this.route.snapshot.params['id'];

    if (this.proyectoCodigo) {
      this.loadProyecto();
    } else {
      this.titulo = 'Nuevo proyecto';
    }
  }

  async loadProyecto() {
    const loading = await this.loadingController.create({
      message: 'Cargando proyecto...',
      spinner: 'circles'
    });

    await loading.present();

    this.proyectoService.getProyecto(this.proyectoCodigo).subscribe(res => {
      loading.dismiss();
      this.proyecto = <Proyecto>res;
      this.titulo = this.proyecto.nombre;
    });
  }

  async saveProyecto() {
    const loading = await this.loadingController.create({
      message: 'Creando proyecto...',
      spinner: 'circles'
    });

    await loading.present();

    if (this.proyectoCodigo) {
      this.proyectoService.updateProyecto(this.proyecto, this.proyectoCodigo).then(() => {
        loading.dismiss();
        this.nav.navigateBack('/dashboard/home');
      });
    } else {
      this.proyecto.fechaCreacion = new Date().getTime();
      this.proyecto.estudiantes.push(this.estudiante);
      this.estudiante.proyectos.push(this.proyecto);
      this.estudiantService.updateEstudiante(this.estudiante , this.codigoEstudiante);

      const data = JSON.parse(JSON.stringify(this.proyecto));

      this.proyectoService.addProyecto(data).then(() => {
        loading.dismiss();
        this.nav.navigateBack('/dashboard/home');
      });
    }
  }
}
