import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isEditMode = false;
  productId: string;
  images: File[] = [];
  previewImages: string[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.initForm();
    
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.productId = params['id'];
        this.loadProductData();
      }
    });
  }

  initForm() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      rentalPeriod: ['', [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
      available: [true]
    });
  }

  loadProductData() {
    this.productService.getProduct(this.productId).subscribe(product => {
      this.productForm.patchValue(product);
      this.previewImages = [...product.images];
    });
  }

  onImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.images = Array.from(input.files);
      this.previewImages = [];
      this.images.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          this.previewImages.push(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  removeImage(index: number) {
    this.previewImages.splice(index, 1);
    this.images.splice(index, 1);
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formData = new FormData();
      const productData = this.productForm.value;
      const currentUser = this.authService.getCurrentUser();

      Object.keys(productData).forEach(key => {
        formData.append(key, productData[key]);
      });

      this.images.forEach(file => {
        formData.append('images', file);
      });

      formData.append('ownerId', currentUser.id);
      formData.append('ownerName', currentUser.name);

      if (this.isEditMode) {
        this.productService.updateProduct(this.productId, formData).subscribe(
          () => this.router.navigate(['/products']),
          error => console.error('Error updating product:', error)
        );
      } else {
        this.productService.createProduct(formData).subscribe(
          () => this.router.navigate(['/products']),
          error => console.error('Error creating product:', error)
        );
      }
    }
  }
}