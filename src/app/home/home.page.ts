import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService, Articulo } from '../services/products.service';
import { CommonModule } from '@angular/common';  
import { IonicModule } from '@ionic/angular';  

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class HomePage {
  products: Articulo[] = [];
  productsFiltrados: Articulo[] = [];
  categoria: string[] = [];
  isLoading = true;

  error: string | null = null;

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.isLoading = true;
    this.productService.getArticulos().subscribe({
      next: (productos: Articulo[]) => {  
        this.products = productos.filter(p => p.activo); 
        this.productsFiltrados = this.products;
        this.extraerCategorias();
        this.isLoading = false;
      },
      error: (error: any) => {  
        console.error('Error al cargar productos:', error);
        this.error = 'Error al cargar los productos. Intenta de nuevo.';
        this.isLoading = false;
      }
    });
  }

  extraerCategorias() {
    const categoriasSet = new Set<string>();
    this.products.forEach(producto => {
      if (producto.categoria?.nombre) {
        categoriasSet.add(producto.categoria.nombre);
      }
    });
    this.categoria = Array.from(categoriasSet);
  }

  verCategoria(categoria: string) {
    if (categoria === 'todos') {
      this.productsFiltrados = this.products;
    } else {
      const categoriaId = this.obtenerCategoriaId(categoria);
      this.productService.getArticulosByCategoria(categoriaId).subscribe({
        next: (productos: Articulo[]) => {  
          this.productsFiltrados = productos;
        },
        error: (error: any) => {  
          console.error('Error al obtener productos filtrados:', error);
          this.error = 'No se pudieron cargar los productos de esta categoría.';
        },
      });
    }
  }

  obtenerCategoriaId(categoriaNombre: string): number {
    const categorias: { [key: string]: number } = { 
      'Electrónica': 1,
      'Herramientas': 2,
      'Ropa': 3,
    };
    return categorias[categoriaNombre] || 0; 
  }

  verDetalleProducto(producto: Articulo) {
    this.router.navigate(['/producto', producto.id]);
  }

  onImageError(event: any) {
    event.target.src = 'assets/images/no-image.png';
  }

  getPrecioFormateado(precio: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(precio);
  }

  toggleFavorite(producto: Articulo, event: Event) {
    event.stopPropagation();
    console.log('Se hizo clic en el corazón para:', producto.nombre);
  }

  agregarProducto() {
    this.router.navigate(['/productos/nuevo']);
  }
}