import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonLabel, IonInput, IonButton, IonNote
} from '@ionic/angular/standalone';
import { ToastController } from '@ionic/angular';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitud-rentador',
  templateUrl: './solicitud-rentador.page.html',
  styleUrls: ['./solicitud-rentador.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonLabel, IonInput, IonButton, IonNote
  ]
})
export class SolicitudRentadorPage {

  form = this.fb.group({
    direccion: ['', [Validators.required, Validators.minLength(10)]],
    telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    identificacion_url: ['', [Validators.required, Validators.pattern(/^(http|https):\/\/.+/)]]
  });

  constructor(
    private fb: FormBuilder,
    private solicitudesService: SolicitudesService,
    private toastCtrl: ToastController,
    private AuthService: AuthService,
    private router: Router
  ) { }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ identificacion_url: file });
    }
  }

  async mostrarToast(mensaje: string, color: 'success' | 'danger' = 'success') {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2500,
      color,
      position: 'bottom'
    });
    await toast.present();
  }

  enviarSolicitud() {
    if (this.form.invalid) {
      this.mostrarToast('Verifica todos los campos', 'danger');
      return;
    }

    this.solicitudesService.crearSolicitud(this.form.value).subscribe({
      next: () => {
        this.mostrarToast('Solicitud enviada');
        this.form.reset();
      },
      error: (err) => {
        const errorMsg = err.error?.message?.join?.('\n') || err.message || 'Error desconocido';
        this.mostrarToast(errorMsg, 'danger');
        console.error('Error completo:', err);
      }
    });


    const formData = new FormData();
    formData.append('direccion', this.form.value.direccion!);
    formData.append('telefono', this.form.value.telefono!);
    formData.append('identificacion_url', this.form.value.identificacion_url!);

    this.solicitudesService.crearSolicitud(formData).subscribe({
      next: () => {
        this.mostrarToast('Tu solicitud ha sido enviada correctamente.', 'success');
        this.form.reset();
      },
      error: (err) => {
        if (err.status === 401) {
          this.mostrarToast('Debes iniciar sesión para enviar una solicitud.', 'danger');
          this.AuthService.logout();
        } else {
          this.mostrarToast(err.error?.message || 'No se pudo enviar la solicitud.', 'danger');
          console.log(err);

        }
      }
    });
  }
}
