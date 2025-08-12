import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalificacionService } from '../services/calificacion.service';

import { ProductosService } from '../services/productos.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-resenias',
  templateUrl: './resenias.page.html',
  styleUrls: ['./resenias.page.scss'],
  standalone: true,
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule
    // importa CommonModule, FormsModule, etc.
  ],
})
export class ReseniasPage implements OnInit {
  calificaciones: any[] = [];

nuevaCalificacion: {
  rentador_id: number | null;
  usuario_id: number | null;
  renta_id: number | null;
  calificacion: number | null;
  comentario: string;
} = {
  rentador_id: null,
  usuario_id: null,
  renta_id: null,
  calificacion: null,
  comentario: '',
};


  constructor(
    private calificacionService: CalificacionService,
    private productoService: ProductosService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Obtener renta_id de la ruta
    const rentaId = Number(this.route.snapshot.paramMap.get('rentaId'));
    this.nuevaCalificacion.renta_id = rentaId;

    // Obtener usuario actual de localStorage
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      const usuarioObj = JSON.parse(usuario);
      this.nuevaCalificacion.usuario_id = usuarioObj.id;
    }

    // Obtener producto relacionado a la renta para sacar rentador_id
    // Aquí depende cómo asocies renta con producto, supongamos que
    // el servicio ProductoService tiene un método que recibe rentaId y devuelve el producto

    this.productoService.getOne(rentaId).subscribe(producto => {
      this.nuevaCalificacion.rentador_id = producto.duenoId; // o como llames al campo dueño
    });

    this.cargarCalificaciones();
  }

  cargarCalificaciones() {
    this.calificacionService.getAll().subscribe(data => {
      this.calificaciones = data;
    });
  }

  agregarCalificacion() {
    if (
      !this.nuevaCalificacion.rentador_id ||
      !this.nuevaCalificacion.usuario_id ||
      !this.nuevaCalificacion.renta_id ||
      !this.nuevaCalificacion.calificacion
    ) {
      alert('Por favor llena todos los campos requeridos.');
      return;
    }

    this.calificacionService.create(this.nuevaCalificacion).subscribe(res => {
      console.log('Calificación creada', res);
      this.limpiarFormulario();
      this.cargarCalificaciones();
    });
  }

  eliminarCalificacion(id: number) {
    this.calificacionService.delete(id).subscribe(() => {
      this.cargarCalificaciones();
    });
  }

  limpiarFormulario() {
    this.nuevaCalificacion.calificacion = null;
    this.nuevaCalificacion.comentario = '';
  }
}
