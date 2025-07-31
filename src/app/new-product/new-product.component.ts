import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],

    imports: [
    CommonModule,
    FormsModule,
  ],
})
export class NewProductComponent  {


  calificaciones: any[] = [];

    nuevoProducto = {
      nombre: null,
      description: null,
      precio: null,
      cantidad_total: null,
      cantidad_disponible: null,
      imagen_url: null,
    };

    constructor(private pService: ProductosService) {}

    ionViewWillEnter() {
      this.pService.getAll().subscribe(data => {
        this.calificaciones = data;
      });
    }

    agregarProducto() {
      if (
        !this.nuevoProducto.nombre ||
        !this.nuevoProducto.description ||
        !this.nuevoProducto.precio ||
        !this.nuevoProducto.cantidad_total ||
        !this.nuevoProducto.cantidad_disponible||
        !this.nuevoProducto.imagen_url
      ) {
        alert('Por favor llena todos los campos requeridos.');
        return;
      }

      this.pService.create(this.nuevoProducto).subscribe(res => {
        console.log('Producto creada', res);
        this.limpiarFormulario();
        this.ionViewWillEnter(); // recargar lista
      });
    }

    eliminarCalificacion(id: number) {
      this.pService.delete(id).subscribe(() => {
        this.ionViewWillEnter(); // recargar lista
      });
    }

    limpiarFormulario() {
      this.nuevoProducto = {
      nombre: null,
      description: null,
      precio: null,
      cantidad_total: null,
      cantidad_disponible: null,
      imagen_url: null,
      };
    }

}
