import { UsuarioService } from 'src/app/services/usuario.service';
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(false);

  constructor(
    private storage: Storage,
    private plt: Platform,
    private usuarioService: UsuarioService) {

    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  login(codigo: string, documento: string) {

    this.usuarioService.getLogin(codigo, documento).valueChanges().subscribe(res => {
      if (res.length > 0) {
        return this.storage.set(TOKEN_KEY, res).then(() => {
          this.authenticationState.next(true);
        });
      } else {
        return false;
      }
    });

  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    });
  }
}
