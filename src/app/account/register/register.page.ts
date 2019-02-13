import { IProyecto } from './../../models/proyecto';
import { AuthenticationService } from './../../services/authentication.service';
import { UsuarioService } from './../../services/usuario.service';
import { ICarrera } from './../../models/carrera';
import { IUsuario } from './../../models/usuario';
import { CarrerasService } from './../../services/carreras.service';
import { EstudiantesService, } from './../../services/estudiantes.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { IEstudiante } from 'src/app/models/estudiante';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  estudiante: IEstudiante = {
    codigo: '',
    apellido: '',
    carrera: null,
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

  usuario: IUsuario = {
    codigo: '',
    docente: null,
    documento: '',
    estado: true,
    estudiante: null,
    fechaCreacion: 0,
    fechaModificacion: 0
  };

  carreras: ICarrera[];

  constructor(
    private estudianteService: EstudiantesService,
    private usuarioService: UsuarioService,
    private carrerasService: CarrerasService,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private nav: NavController,
    private toastController: ToastController,
    private authenticationServices: AuthenticationService
  ) { }

  ngOnInit() {
    // Se carga el listado de carreras
    this.carrerasService.getCarreras().subscribe(res => {
      this.carreras = res;
    });
  }

  /**
   * Permite almacenar los registros de usuario estudiante
   */
  async saveEstudiante() {
    // Se crea loading controller para mostrar pantalla de espera mientras se completa la operacion
    const loading = await this.loadingController.create({
      message: 'Registrando tus datos...',
      spinner: 'circles'
    });

    await loading.present();

    this.estudiante.fechaCreacion = new Date().getDate();
    this.usuario.codigo = this.estudiante.codigo;
    this.usuario.documento = this.estudiante.documento;
    this.usuario.estado = true;
    this.usuario.estudiante = this.estudiante;
    this.usuario.fechaCreacion = new Date().getDate();

    this.usuarioService.addUsuario(this.usuario);

    this.estudianteService.addEstudiante(this.estudiante).then(() => {
      this.authenticationServices.login(this.usuario.codigo, this.usuario.documento);
      loading.dismiss();
      this.nav.navigateBack('/dashboard/home');
    });
  }
}
