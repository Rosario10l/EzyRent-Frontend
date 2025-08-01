import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent {
  productos = [
    { nombre: 'Tenis Adidas Classic', precio: 999, imagen: 'assets/adidas1.jpg', categoria: 'Adidas' },
    { nombre: 'Tenis Nike Air', precio: 1200, imagen: 'assets/nike1.jpg', categoria: 'Nike' },
    { nombre: 'Fila Running', precio: 890, imagen: 'assets/fila1.jpg', categoria: 'Fila' },
  ];

  categoriaSeleccionada: string = '';
  productosFiltrados: any[] = [];

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.categoriaSeleccionada = params['categoria'] || '';
      this.filtrarProductos(); 
    });
  }

  filtrarProductos() {
    this.productosFiltrados = this.productos.filter(
      p => p.categoria.toLowerCase() === this.categoriaSeleccionada.toLowerCase()
    );
  }
}
