import { Component, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CalificacionService } from '../services/calificacion.service';

@Component({
  selector: 'app-resenias',
  templateUrl: './resenias.page.html',
  styleUrls: ['./resenias.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
})
export class ReseniasPage {
  calificaciones: any[] = [];

  nuevaCalificacion = {
    rentador_id: null,
    usuario_id: null,
    renta_id: null,
    Calificacion: null,
    comentario: '',
  };

  constructor(private calificacionService: CalificacionService) {}

  ionViewWillEnter() {
    this.calificacionService.getAll().subscribe(data => {
      this.calificaciones = data;
    });
  }

  agregarCalificacion() {
    if (
      !this.nuevaCalificacion.rentador_id ||
      !this.nuevaCalificacion.usuario_id ||
      !this.nuevaCalificacion.renta_id ||
      !this.nuevaCalificacion.Calificacion
    ) {
      alert('Por favor llena todos los campos requeridos.');
      return;
    }

    this.calificacionService.create(this.nuevaCalificacion).subscribe(res => {
      console.log('Calificación creada', res);
      this.limpiarFormulario();
      this.ionViewWillEnter(); // recargar lista
    });
  }

  eliminarCalificacion(id: number) {
    this.calificacionService.delete(id).subscribe(() => {
      this.ionViewWillEnter(); // recargar lista
    });
  }

  limpiarFormulario() {
    this.nuevaCalificacion = {
      rentador_id: null,
      usuario_id: null,
      renta_id: null,
      Calificacion: null,
      comentario: '',
    };
  }
}
