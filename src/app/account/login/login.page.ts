import { ToastController } from '@ionic/angular';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  codigoUsuario: string;
  documentoUsuario: string;

  constructor(
    private authenticationServices: AuthenticationService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  async login() {
    if (this.codigoUsuario && this.documentoUsuario) {
      this.authenticationServices.login(this.codigoUsuario, this.documentoUsuario);
    } else {
      const toast = await this.toastController.create({
        message: 'Codigo y/o Documento incorrectos',
        showCloseButton: true,
        position: 'bottom',
        closeButtonText: 'Ok'
      });
      toast.present();
    }
  }
}
