import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { ProductService, Articulo } from '../services/products.service';
import { AuthService, User } from '../services/auth.service';
import { RentaService,  } from '../services/renta.service';
import { FormsModule } from '@angular/forms';
import { take } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { UsuariosService } from '../services/usuarios.service';
import { Usuario } from '../services/usuarios.service'; // Ajusta la ruta si es diferente




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, FormsModule ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [DatePipe]
})
export class HomePage implements OnInit {
  products: Articulo[] = [];
  productsFiltrados: Articulo[] = [];
  categoria: string[] = [];
  selectedCategory: string = 'todos';
  isLoading = true;
  error: string | null = null;

  isModalOpen: boolean = false;
  selectedProduct: Articulo | null = null;
  selectedUsuario: User | null = null;
  fecha_inicio: string | null = null;
  fecha_fin: string | null = null;
  cantidad: number = 1;
  today: string;

  constructor(
    private router: Router,
    private productservice: ProductService,
    private toastController: ToastController,
    private rentaService: RentaService,
    private authService: AuthService,
    private usuariosService: UsuariosService,
  ) {
        this.today = new Date().toISOString();

  }

  ngOnInit() {
    this.cargarProductos();
    // Suscribirse a los cambios del usuario para obtener su ID
    this.authService.currentUser$.pipe(take(1)).subscribe(user => {
        this.selectedUsuario = user;
    });

    // Después de obtener productos (por ejemplo, en ngOnInit o después de la llamada http)

this.extraerCategorias();
this.verCategoria('todos'); // para que muestre todo al inicio

  }

  async cargarProductos() {
    try {
      this.isLoading = true;
      this.error = null;
this.productservice.getArticulos().subscribe({
  next: (products) => {
    this.products = products.filter(p => p.activo);
    console.log('Productos cargados:', this.products); // <-- revisa aquí
    this.productsFiltrados = this.products;
    this.extraerCategorias();
    console.log('Categorías extraídas:', this.categoria); // <-- revisa aquí
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
    this.selectedCategory = categoria;
    if (categoria === 'todos') {
      this.productsFiltrados = this.products;
    } else {
      this.productsFiltrados = this.products.filter(
        products => products.categoria?.nombre.toLowerCase() === categoria.toLowerCase()
      );
    }
  }

  async openRentalModal(producto: Articulo): Promise<void> {
    if (producto.cantidad_disponible <= 0) {
      const toast = await this.toastController.create({
        message: 'Este producto no está disponible para renta.',
        duration: 1000,
        position: 'middle',
        color: 'danger'
      });
      toast.present();
      return;
    }
    this.selectedProduct = producto;

    this.fecha_inicio = null;
    this.fecha_fin = null;
    this.cantidad = 1;

    this.isModalOpen = true;
  }

  closeRentalModal(): void {
    this.isModalOpen = false;
    this.selectedProduct = null;
    this.fecha_inicio = null;
    this.fecha_fin = null;
  }

  incrementarCantidad(): void {
    if (this.selectedProduct && this.cantidad < this.selectedProduct.cantidad_disponible) {
      this.cantidad++;
    }
  }

  decrementarCantidad(): void {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }


  verDetalleProducto(producto: Articulo) {
    this.router.navigate(['/detalles', producto.id]);
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



  async agregarProducto() {
  const userStr = localStorage.getItem('user');
  if (!userStr) {
    console.warn('No hay usuario logueado');
    this.router.navigate(['/login']);
    return;
  }
  const userLogged = JSON.parse(userStr);
  const usuarioId = userLogged.id;

  try {
    const usuario: Usuario = await firstValueFrom(this.usuariosService.getOne(usuarioId));
    if (usuario.es_rentador === 1) {
      this.router.navigate(['/new-product']);
    } else {
      this.router.navigate(['/convertirse-rentador']);
    }
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    this.router.navigate(['/login']);
  }
}


  onDateChange(event: any) {
  const value = event.detail.value;
  if (value && value.start && value.end) {
    this.fecha_inicio = value.start;
    this.fecha_fin = value.end;
  } else {
    this.fecha_inicio = null;
    this.fecha_fin = null;
  }
}


  getAvailabilityText(quantity: number): string {
    return quantity > 0 ? 'Disponible' : 'Agotado';
  }


  getAvailabilityClasses(quantity: number): string {
    return quantity > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
  }
}
