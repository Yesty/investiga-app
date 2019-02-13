import { IAsesor } from './../../models/asesor';
import { IAdjunto } from './../../models/adjunto';
import { CategoriasService } from './../../services/categorias.service';
import { FormaInvestigacionService } from './../../services/forma-investigacion.service';
import { EstudiantesService } from './../../services/estudiantes.service';
import { IEstudiante } from 'src/app/models/estudiante';
import { ICategoria } from './../../models/categoria';
import { IFormaInvestigacion } from './../../models/forma-investigacion';
import { IProyecto } from './../../models/proyecto';
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

  proyecto: IProyecto = {
    adjuntos: new Array<IAdjunto>(),
    asesores: new Array<IAsesor>(),
    categoria: null,
    codigo: '',
    descripcion: '',
    estado: true,
    estudiantes: new Array<{ codigo: string, tipo: string }>(),
    fechaCreacion: 0,
    fehcaModificacion: 0,
    formaInvestigacion: null,
    meritos: new Array<string>(),
    nombre: '',
    avanceProyecto: 'Ante proyecto'
  };

  proyectoCodigo: string = null;
  titulo: string;
  formasInvestigacion: IFormaInvestigacion[];
  categorias: ICategoria[];
  estudiante: IEstudiante;
  codigoEstudiante: string;
  idEstudiante: string;

  constructor(
    private proyectoService: ProyectoService,
    private estudiantService: EstudiantesService,
    private categoriaService: CategoriasService,
    private formasInvestigacionservice: FormaInvestigacionService,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private nav: NavController,
    private storage: Storage,
  ) {

    this.storage.get('auth-token').then((val: IEstudiante) => {
      this.codigoEstudiante = val[0].codigo;

      this.estudiantService.getEstudianteQuery(this.codigoEstudiante).subscribe(res => {
        this.idEstudiante = res[0].id;
        this.estudiante = <IEstudiante>res[0];
      });
    });

    this.formasInvestigacionservice.getFormasInvestigacion().subscribe(res => {
      this.formasInvestigacion = res;
    });

    this.categoriaService.getCategorias().subscribe(res => {
      this.categorias = res;
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
      this.proyecto = <IProyecto>res;
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
      // Se obtienen los datos de la fecha para formatear el codigo para el proyecto
      const year = new Date().getFullYear();
      const month = new Date().getMonth();
      const day = new Date().getDay();

      let formatCodigo = this.proyecto.nombre.toLowerCase().replace(' ', '');
      formatCodigo = `${formatCodigo}${year}${month}${day}`;

      this.proyecto.codigo = formatCodigo;
      this.proyecto.fechaCreacion = new Date().getTime();
      this.proyecto.estudiantes.push({
        codigo: this.estudiante.codigo,
        tipo: 'Administrador'
      });
      this.estudiante.proyectos.push(this.proyecto);

      this.estudiantService.updateEstudiante(this.estudiante, this.idEstudiante);

      this.proyectoService.addProyecto(this.proyecto).then(() => {
        loading.dismiss();
        this.nav.navigateBack('/dashboard/home');
      });
    }
  }
}
