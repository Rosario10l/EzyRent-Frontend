import { Component, OnInit } from '@angular/core';
import {
  IonApp, IonRouterOutlet, IonList, IonContent, IonLabel,
  IonItem, IonMenu, IonMenuButton, IonButtons, IonButton,
  IonIcon, IonBadge, IonHeader, IonToolbar, IonTitle,
  IonAvatar, IonToggle, IonImg, IonPopover, IonListHeader
} from '@ionic/angular/standalone';
import { AuthService } from './services/auth.service';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { addIcons } from 'ionicons';
import {
  homeOutline, logInOutline, personAddOutline,
  documentTextOutline, logOutOutline, notificationsOutline,
  sunnyOutline, moonOutline, settingsOutline, menuOutline
} from 'ionicons/icons';
import { SolicitudesService } from './services/solicitudes.service';
import { filter } from 'rxjs/operators';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { PopoverController } from '@ionic/angular/standalone';


interface Notification {
  id: number;
  title: string;
  message: string;
  date: Date;
  read: boolean;
  icon?: string;
  route?: string;
}
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonListHeader, IonPopover,
    IonItem, IonApp, IonMenu, RouterLink, IonRouterOutlet,
    IonList, IonContent, IonLabel, IonMenuButton, IonButtons,
    IonButton, IonIcon, IonBadge, IonHeader, IonToolbar,
    IonTitle, IonAvatar, CommonModule, AsyncPipe, IonPopover, IonListHeader
  ]
})
export class AppComponent implements OnInit {

  isNotificationsOpen = false;
  notifications: Notification[] = [
    {
      id: 1,
      title: 'Nueva solicitud',
      message: 'Tienes una nueva solicitud de arriendo',
      date: new Date(),
      read: false,
      icon: 'document-text-outline',
      route: '/solicitudes'
    },
    {
      id: 2,
      title: 'Pago recibido',
      message: 'Se ha procesado tu pago por $150.000',
      date: new Date(Date.now() - 3600000),
      read: false,
      icon: 'cash-outline'
    },
    {
      id: 3,
      title: 'Recordatorio',
      message: 'Tu arriendo finaliza en 2 días',
      date: new Date(Date.now() - 86400000),
      read: true,
      icon: 'calendar-outline'
    }
  ];
  private authSubscription!: Subscription;
  menuItems = [
    { title: 'Inicio', url: '/home', showWhen: 'loggedIn', icon: 'home-outline' },
    { title: 'Iniciar sesión', url: '/login', showWhen: 'loggedOut', icon: 'log-in-outline' },
    { title: 'Registrarse', url: '/register', showWhen: 'loggedOut', icon: 'person-add-outline' },
   { title: 'Solicitudes', url: '/solictud', showWhen: 'loggedIn', showOnlyFor: 'admin', icon: 'document-text-outline' },
    { title: 'Solicitar ser rentador', url: '/solicitud-rentador', showWhen: 'loggedIn', showOnlyFor: 'usuario', icon: 'document-text-outline' },
    { title: 'Cerrar sesión', url: '/login', showWhen: 'loggedIn', icon: 'log-out-outline', action: 'logout' },
  ];

  currentPageTitle = 'Inicio';
  pendingRequests = 0;
  unreadNotifications = 0;
  isDarkMode = false;

  constructor(
    public authService: AuthService,
    private solicitudesService: SolicitudesService,
    private router: Router,
    private titleService: Title,
    private popoverCtrl: PopoverController
  ) {
    addIcons({ menuOutline, notificationsOutline, homeOutline, logInOutline, personAddOutline, documentTextOutline, logOutOutline, sunnyOutline, moonOutline, settingsOutline });
  }

  ngOnInit() {
    this.setupRouterEvents();
    this.checkDarkMode();
    this.loadPendingRequests();
    this.authSubscription = this.authService.getAuthStatus().subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.loadPendingRequests();
      }
      else {
        this.pendingRequests = 0;
        this.unreadNotifications = 0;
      }
    });
    if (this.authService.isLoggedIn()) {
      this.loadPendingRequests();
    }
  }
  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  setupRouterEvents() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateCurrentPageTitle();
    });
  }

  updateCurrentPageTitle() {
    const title = this.titleService.getTitle();
    this.currentPageTitle = title || 'Inicio';
  }

  loadPendingRequests() {
    if (this.authService.isLoggedIn()) {
      this.solicitudesService.obtenerTodas().subscribe(requests => {
        this.pendingRequests = requests.filter(r => r.estado === 'pendiente').length;
      });
    }
  }

  handleItemClick(item: any) {
    if (item.action === 'logout') {
      this.authService.logout();
    }
  }

  shouldShow(item: any): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    const currentUser = this.authService.getCurrentUser();

    // Validar si debe mostrarse por login/logout
    if (item.showWhen === 'loggedIn' && !isLoggedIn) return false;
    if (item.showWhen === 'loggedOut' && isLoggedIn) return false;

    // Validar rol si existe restricción
    if (item.showOnlyFor && currentUser?.rol !== item.showOnlyFor) return false;

    return true;
  }
  getIconForItem(item: any): string {
    return item.icon || 'help-outline';
  }

  isActive(url: string): boolean {
    return this.router.url === url;
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark', this.isDarkMode);
    localStorage.setItem('darkMode', this.isDarkMode ? 'enabled' : 'disabled');
  }

  checkDarkMode() {
    const darkMode = localStorage.getItem('darkMode');
    this.isDarkMode = darkMode === 'enabled';
    document.body.classList.toggle('dark', this.isDarkMode);
  }

  async presentNotifications(ev?: Event) {
    this.isNotificationsOpen = true;

    // Actualiza las notificaciones no leídas
    this.unreadNotifications = this.notifications.filter(n => !n.read).length;
  }

  markAllAsRead() {
    this.notifications = this.notifications.map(n => ({
      ...n,
      read: true
    }));
    this.unreadNotifications = 0;
    this.isNotificationsOpen = false;
  }

  openNotification(notification: Notification) {
    this.notifications = this.notifications.map(n =>
      n.id === notification.id ? { ...n, read: true } : n
    );

    this.unreadNotifications = this.notifications.filter(n => !n.read).length;

    if (notification.route) {
      this.router.navigateByUrl(notification.route);
    }

    this.isNotificationsOpen = false;
  }

}
