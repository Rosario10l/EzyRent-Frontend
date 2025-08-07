import { Component, OnInit } from '@angular/core';
import {
  IonApp, IonRouterOutlet, IonList, IonContent, IonLabel,
  IonItem, IonMenu, IonMenuButton, IonButtons, IonButton,
  IonIcon, IonBadge, IonHeader, IonToolbar, IonTitle,
  IonAvatar, IonToggle, IonImg
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

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonImg,
    IonItem, IonApp, IonMenu, RouterLink, IonRouterOutlet,
    IonList, IonContent, IonLabel, IonMenuButton, IonButtons,
    IonButton, IonIcon, IonBadge, IonHeader, IonToolbar,
    IonTitle, IonAvatar, IonToggle, CommonModule, AsyncPipe
  ]
})
export class AppComponent implements OnInit {
  private authSubscription!: Subscription;
  menuItems = [
    { title: 'Inicio', url: '/home', showWhen: 'loggedIn', icon: 'home-outline' },
    { title: 'Iniciar sesión', url: '/login', showWhen: 'loggedOut', icon: 'log-in-outline' },
    { title: 'Registrarse', url: '/register', showWhen: 'loggedOut', icon: 'person-add-outline' },
    { title: 'Solicitudes', url: '/solictud', showWhen: 'loggedIn', icon: 'document-text-outline' },
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
    private titleService: Title
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
    return (item.showWhen === 'loggedIn' && this.authService.isLoggedIn()) ||
      (item.showWhen === 'loggedOut' && !this.authService.isLoggedIn());
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

  async presentNotifications() {
    // Implementar lógica de notificaciones
  }
}
