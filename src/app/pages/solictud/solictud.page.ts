import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { AuthService } from '../../services/auth.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-solictud',
  templateUrl: './solictud.page.html',
  styleUrls: ['./solictud.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SolictudPage implements OnInit {
  solicitudes: any[] = [];
  constructor(
    private solicitudesService: SolicitudesService,
    private authService: AuthService,
    private toastCOntroller: ToastController,
    private alertController: AlertController

  ) { }

  ngOnInit() {
    this.cargarSolicitudes();
  }

  cargarSolicitudes() {
    this.solicitudesService.obtenerTodas().subscribe({
      next: (res) => (this.solicitudes = res),
      error: (err) => console.error(err),
    });
  }
  async confirmarAccion(id: number, accion: 'aprobar' | 'rechazar') {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: `¿Estás seguro de ${accion} esta solicitud?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Confirmar',
          handler: () => {
            if (accion === 'aprobar') {
              this.aprobar(id);
            } else {
              this.rechazar(id);
            }
          },
        },
      ],
    });
    await alert.present();
  }

  aprobar(id: number) {
    this.solicitudesService.aprobarSolitud(id).subscribe({
      next: async () => {
        await this.mostrarToast('Solicitud aprobada');
        this.cargarSolicitudes();
      },
      error: (err) => console.error(err),
    })

  }
  rechazar(id: number) {
    this.solicitudesService.rechazarSolicitud(id).subscribe({
      next: async () => {
        await this.mostrarToast('Solicitud rechazada');
        this.cargarSolicitudes();
      },
    });
  }


  async mostrarToast(message: string) {
    const toast = await this.toastCOntroller.create({
      message,
      duration: 2000,
      color: 'success',
    });
    await toast.present();
  }
}
