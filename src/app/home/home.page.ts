import { Component } from '@angular/core';
import { IonHeader,IonMenuButton, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonMenu } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
 imports: [
    IonButtons,
    IonMenuButton,  // <-- Añade esto al array de imports
    IonMenu,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent
  ],
})
export class HomePage {
  constructor(public authService:AuthService, private menuCtrl: MenuController ) {}
  handleItemClick(item: any){
    if (item.action == 'logout') {
      this.authService.logout();
    }
    this.menuCtrl.close();
  }
}
