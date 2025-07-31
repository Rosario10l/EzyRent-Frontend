import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonList, IonModal, IonContent, IonLabel, IonItem, IonMenu } from '@ionic/angular/standalone';
import { AuthService } from './services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonItem, IonApp,IonMenu,RouterLink, IonRouterOutlet, IonList, IonContent, IonLabel],
})
export class AppComponent {
  constructor(public authService: AuthService) {}
    menuItems = [
    { title: 'Inicio', url: '/home', showWhen: 'loggedIn' },
    { title: 'Iniciar sesión', url: '/login', showWhen: 'loggedOut' },
    { title: 'Registrarse', url: '/register', showWhen: 'loggedOut' },
    { title: 'Cerrar sesión', url: '/login', showWhen: 'loggedIn', action: 'logout' },
  ];

  handleItemClick(item: any) {
    if (item.action === 'logout') {
      this.authService.logout();
    }
  }

  shouldShow(item: any): boolean {
    return (item.showWhen === 'loggedIn' && this.authService.isLoggedIn()) ||
           (item.showWhen === 'loggedOut' && !this.authService.isLoggedIn());
  }
}
