import { AuthenticationService } from './../../services/authentication.service';
import { UsuarioService } from './../../services/usuario.service';
import { Carrera } from './../../models/carrera';
import { Usuario } from './../../models/usuario';
import { CarrerasService } from './../../services/carreras.service';
import { EstudiantesService, } from './../../services/estudiantes.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/models/estudiante';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  estudiante: Estudiante;
  usuario: Usuario;
  carreras: Carrera[];

  constructor(
    private estudianteService: EstudiantesService,
    private usuarioService: UsuarioService,
    private carrerasService: CarrerasService,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private nav: NavController,
    private toastController: ToastController,
    private authenticationServices: AuthenticationService
  ) {
    this.estudiante = new Estudiante();
    this.usuario = new Usuario();
  }

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

    const dataU = JSON.parse (JSON.stringify (this.usuario));
    const dataE = JSON.parse (JSON.stringify (this.estudiante));

    this.usuarioService.addUsuario(dataU);

    this.estudianteService.addEstudiante(dataE).then(() => {
      this.authenticationServices.login(this.usuario.codigo, this.usuario.documento);
      loading.dismiss();
      this.nav.navigateBack('/dashboard/home');
    });
  }
}
