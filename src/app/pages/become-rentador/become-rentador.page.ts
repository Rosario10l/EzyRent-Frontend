import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { IonHeader, IonToolbar, IonTitle } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-become-rentador',
  templateUrl: './become-rentador.page.html',
    imports: [
    IonicModule,
    ReactiveFormsModule,
    CommonModule,
  ]

})
export class BecomeRentadorPage {
  // Define la estructura del formulario reactivo
  form: FormGroup;

  // El constructor inyecta el FormBuilder para construir el formulario
  // y el ToastController para mostrar notificaciones al usuario
  constructor(
    private fb: FormBuilder,
    private toastCtrl: ToastController
  ) {
    // Se inicializa el formulario con campos requeridos
    this.form = this.fb.group({
      fullName: ['', Validators.required], // Nombre completo es obligatorio
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]], // Teléfono debe tener 10 dígitos
      address: ['', Validators.required], // Dirección es obligatoria
      acceptTerms: [false, Validators.requiredTrue], // Debe aceptar los términos
    });
  }

  // Esta función se ejecuta cuando el usuario envía el formulario
  async onSubmit() {
    // Si el formulario no es válido, se muestra un mensaje de error
    if (this.form.invalid) {
      const toast = await this.toastCtrl.create({
        message: 'Por favor, completa todos los campos correctamente.',
        duration: 2500,
        color: 'danger',
      });
      toast.present();
      return;
    }

    // Si es válido, se imprime la información en consola (simulación)
    console.log('Formulario enviado:', this.form.value);

    // Se notifica al usuario que la solicitud fue enviada correctamente
    const toast = await this.toastCtrl.create({
      message: '¡Solicitud enviada! Ya puedes subir productos (simulación).',
      duration: 2500,
      color: 'success',
    });
    toast.present();

    // Aquí podría redirigirse al usuario o desbloquear el acceso a subir productos
  }
}
