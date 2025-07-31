import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProductService, Articulo } from '../services/products.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage{
  // productos = [
  //   { nombre: 'Tenis Adidas Classic', precio: 999, imagen: 'assets/adidas1.jpg' },
  //   { nombre: 'Tenis Nike Air', precio: 1200, imagen: 'assets/nike1.jpg' },
  //   { nombre: 'Fila Running', precio: 890, imagen: 'assets/fila1.jpg' },
  // ];
  products: Articulo[] = [];
  productsFiltrados: Articulo[] = [];
  categoria: string[] = [];
  isLoading = true;
  
  error: string | null = null;

  constructor(private router: Router,
  private productservice: ProductService) {}
  
 ngOnInit() {
    this.cargarProductos();
  }

  async cargarProductos() {
    try {
      this.isLoading = true;
      this.error = null;
      
      this.productservice.getArticulos().subscribe({
        next: (products) => {
          this.products = products.filter(p => p.activo);
          this.productsFiltrados = this.products;
          this.extraerCategorias();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error al cargar productos:', error);
          this.error = 'Error al cargar los productos. Intenta de nuevo.';
          this.isLoading = false;
        }
      });
    } catch (error) {
      console.error('Error:', error);
      this.error = 'Error de conexión con el servidor.';
      this.isLoading = false;
    }
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
      this.productsFiltrados = this.products.filter(
        products => products.categoria?.nombre.toLowerCase() === categoria.toLowerCase()
      );
    }
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
  this.router.navigate(['/productos/nuevo']); // ajusta según tus rutas
}

}

