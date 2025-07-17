import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-resenias',
  templateUrl: './resenias.page.html',
  styleUrls: ['./resenias.page.scss'],
  standalone: true,
  imports: [

    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ReseniasPage {
  resenaForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    calificacion: ['', Validators.required],
    comentario: ['', [Validators.required, Validators.minLength(5)]]
  });

  constructor(private fb: FormBuilder) {}

  enviarResena() {
    if (this.resenaForm.valid) {
      const datosResena = this.resenaForm.value;
      console.log('✅ Reseña enviada:', datosResena);

      // Aquí podrías llamar a un servicio HTTP
      // this.resenaService.enviarResena(datosResena).subscribe(...);

      this.resenaForm.reset();
    } else {
      console.warn('❌ Formulario inválido');
      this.resenaForm.markAllAsTouched();
    }
  }
}
