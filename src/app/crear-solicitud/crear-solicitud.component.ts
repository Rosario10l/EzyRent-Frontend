import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SolicitudRentadorService } from '../services/solicitud-rentador.service';
import { ToastController, NavController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
  styleUrls: ['./crear-solicitud.component.scss'],
})
export class CrearSolicitudComponent {
  solicitudForm = this.fb.group({
    direccion: ['', Validators.required],
    telefono: ['', Validators.required],
    identificacion_url: [''],
  });

  constructor(
    private fb: FormBuilder,
    private solicitudService: SolicitudRentadorService,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {}

  async enviarSolicitud() {
  if (this.solicitudForm.invalid) {
    const toast = await this.toastCtrl.create({
      message: 'Por favor llena todos los campos requeridos.',
      duration: 2000,
      color: 'warning',
    });
    await toast.present();
    return;
  }

  const usuario = localStorage.getItem('user');
  if (!usuario) {
    const toast = await this.toastCtrl.create({
      message: 'No se encontró usuario logueado.',
      duration: 2000,
      color: 'danger',
    });
    await toast.present();
    return;
  }

  const usuarioObj = JSON.parse(usuario);

  // Garantizar que direccion y telefono no sean undefined o null
  const dto = {
    usuarioId: usuarioObj.id,
    direccion: this.solicitudForm.value.direccion || '',
    telefono: this.solicitudForm.value.telefono || '',
    identificacion_url: this.solicitudForm.value.identificacion_url || '',
  };

  try {
    await firstValueFrom(this.solicitudService.crearSolicitud(dto));
    const toast = await this.toastCtrl.create({
      message: 'Solicitud enviada correctamente.',
      duration: 2000,
      color: 'success',
    });
    await toast.present();
    this.navCtrl.back();
  } catch (error) {
    const toast = await this.toastCtrl.create({
      message: 'Error enviando la solicitud.',
      duration: 2000,
      color: 'danger',
    });
    await toast.present();
    console.error(error);
  }
}

}
