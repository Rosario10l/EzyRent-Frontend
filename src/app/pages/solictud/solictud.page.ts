import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonAvatar,
  IonChip,
  IonLabel,
  IonIcon,
  IonButtons
} from '@ionic/angular/standalone';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { AuthService } from '../../services/auth.service';
import { AlertController, ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  checkmarkCircleOutline,
  closeCircleOutline,
  chevronForwardOutline,
  notificationsOutline,
  calendarOutline,
  documentTextOutline,
  fileTrayOutline
} from 'ionicons/icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-solictud',
  templateUrl: './solictud.page.html',
  styleUrls: ['./solictud.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonAvatar,
    IonChip,
    IonLabel,
    IonIcon,
    IonButtons,
    CommonModule,
    FormsModule,
    RouterLink

  ]
})
export class SolictudPage implements OnInit {
  solicitudes: any[] = [];
  filtroActivo: string = 'todas';
  isLoading: boolean = true;

  constructor(
    private solicitudesService: SolicitudesService,
    private authService: AuthService,
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    // Registrar los iconos que vamos a usar
    addIcons({
      checkmarkCircleOutline,
      closeCircleOutline,
      chevronForwardOutline,
      notificationsOutline,
      calendarOutline,
      documentTextOutline,
      fileTrayOutline
    });
  }

  ngOnInit() {
    this.cargarSolicitudes();
  }

  cargarSolicitudes() {
    this.isLoading = true;
    this.solicitudesService.obtenerTodas().subscribe({
      next: (res) => {
        this.solicitudes = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.mostrarToast('Error al cargar solicitudes', 'danger');
      },
    });
  }

  cambiarFiltro(filtro: string) {
    this.filtroActivo = filtro;
  }

  get solicitudesFiltradas() {
    if (this.filtroActivo === 'todas') return this.solicitudes;
    if (this.filtroActivo === 'pendientes') return this.solicitudes.filter(s => s.estado === 'pendiente');
    if (this.filtroActivo === 'aprobadas') return this.solicitudes.filter(s => s.estado === 'aprobado');
    if (this.filtroActivo === 'rechazadas') return this.solicitudes.filter(s => s.estado === 'rechazado');
    return this.solicitudes;
  }

  async confirmarAccion(id: number, accion: 'aprobar' | 'rechazar') {
    const alert = await this.alertController.create({
      header: 'Confirmar acción',
      message: `¿Estás seguro de querer ${accion === 'aprobar' ? 'aprobar' : 'rechazar'} esta solicitud?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'text-gray-500'
        },
        {
          text: 'Confirmar',
          handler: () => {
            if (accion === 'aprobar') {
              this.aprobar(id);
            } else {
              this.rechazar(id);
            }
          },
          cssClass: accion === 'aprobar' ? 'text-green-600' : 'text-red-600'
        }
      ]
    });
    await alert.present();
  }

  aprobar(id: number) {
    this.solicitudesService.aprobarSolitud(id).subscribe({
      next: async () => {
        await this.mostrarToast('Solicitud aprobada correctamente', 'success');
        this.cargarSolicitudes();
      },
      error: async (err) => {
        console.error(err);
        await this.mostrarToast('Error al aprobar solicitud', 'danger');
      }
    });
  }

  rechazar(id: number) {
    this.solicitudesService.rechazarSolicitud(id).subscribe({
      next: async () => {
        await this.mostrarToast('Solicitud rechazada correctamente', 'success');
        this.cargarSolicitudes();
      },
      error: async (err) => {
        console.error(err);
        await this.mostrarToast('Error al rechazar solicitud', 'danger');
      }
    });
  }

  async mostrarToast(message: string, color: 'success' | 'danger' | 'warning' = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top',
      cssClass: 'toast-style'
    });
    await toast.present();
  }


  formatearFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}
