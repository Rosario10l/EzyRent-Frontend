import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';
import { LoadingController, ToastController } from '@ionic/angular
'
@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  products: Product[] = [];
  currentUser: any;
  isAdmin = false;
  isLandlord = false;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}


  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.isAdmin = this.currentUser?.role === 'admin';
    this.isLandlord = this.currentUser?.role === 'landlord';
    this.loadProducts();
  }

  loadProducts() {
    if (this.isLandlord) {
      this.productService.getProductsByOwner(this.currentUser.id).subscribe(
        products => this.products = products,
        error => console.error('Error loading products:', error)
      );
    } else {
      this.productService.getProducts().subscribe(
        products => this.products = products,
        error => console.error('Error loading products:', error)
      );
    }
  }

  navigateToAdd() {
    this.router.navigate(['/products/new']);
  }

  navigateToEdit(id: string) {
    this.router.navigate(['/products/edit', id]);
  }

  deleteProduct(id: string) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe(
        () => this.loadProducts(),
        error => console.error('Error deleting product:', error)
      );
    }
  }
}