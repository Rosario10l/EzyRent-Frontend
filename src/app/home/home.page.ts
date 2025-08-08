import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { ProductService, Articulo } from '../services/products.service';
import { AuthService, User } from '../services/auth.service';
import { RentaService, Renta } from '../services/renta.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, DatePipe, FormsModule ], 
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
  ) {
    this.today = new Date().toISOString();
    // Suscribirse a los cambios del usuario para obtener su ID
    // this.authService.currentUser$.subscribe(user => {
    //     this.selectedUsuario = user;
    // });
  }

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

  async confirmRental(): Promise<void> {
    if (!this.selectedProduct || !this.fecha_inicio || !this.fecha_fin || this.cantidad <= 0) {
      // El mensaje de error es más genérico para cubrir todos los campos faltantes
      this.presentToast('Por favor, revisa que todos los campos de la renta estén completos.', 'warning');
      return;
    }

    // const usuarioId = parseInt(this.selectedUsuario.id, 10);
    // if (isNaN(usuarioId)) {
    //   this.presentToast('El ID del usuario no es válido.', 'danger');
    //   return;
    // }

    
    const nuevaRenta: Renta = {
      articuloId: this.selectedProduct.id,
      // usuarioId: usuarioId,
      cantidad: this.cantidad,
      fecha_inicio: this.fecha_inicio,
      fecha_fin: this.fecha_fin
    };

    this.rentaService.crearRenta(nuevaRenta).subscribe({
      next: (response) => {
        console.log('Renta confirmada:', response);
        this.presentToast('Renta confirmada exitosamente.', 'success');
        this.closeRentalModal();
      },
      error: (error) => {
        console.error('Error al crear la renta:', error);
        this.presentToast('Error al confirmar la renta. Intenta de nuevo.', 'danger');
      }
    });
  }
  
  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'middle',
      color
    });
    toast.present();
  }
  
  verDetalleProducto(producto: Articulo) {
    this.router.navigate(['/productos', producto.id]);
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

  

  agregarProducto() {
    this.router.navigate(['/productos/nuevo']);
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
