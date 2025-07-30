import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { AuthService } from 'src/app/services/auth.service';
import { IonicModule, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  imports:[IonicModule,ReactiveFormsModule]
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  isEditMode = false;
  productId: string | null = null;
  images: File[] = [];
  previewImages: string[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private authService: AuthService,
    private loadingController: LoadingController,
    private toastController: ToastController
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
    if(this.productId){
      this.productService.getProductById(this.productId).subscribe(
        product=>{
          this.productForm.patchValue(product);
        },
        error=>{
          console.error('Error al cargar productos', error)
          this.presentToast('error al cargar los datos del producto')
        }
      );
    }
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

 async onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched(); 
      await this.presentToast('Por favor, completa todos los campos requeridos', 'warning');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Guardando...',
      spinner: 'crescent'
    });
    await loading.present();

    const formData = new FormData();
    const productData = this.productForm.value;
    const currentUser = this.authService.getCurrentUser();

    if (!currentUser || !currentUser.id || !currentUser.name) {
        await loading.dismiss();
        await this.presentToast('Error: Usuario no autenticado o incompleto.', 'danger');
        this.router.navigate(['/login']); 
        return;
    }


    Object.keys(productData).forEach(key => {
      formData.append(key, productData[key]);
    });

    this.images.forEach(file => {
      formData.append('images', file);
    });

    formData.append('ownerId', currentUser.id);
    formData.append('ownerName', currentUser.name);

    try {
      if (this.isEditMode) {
        if (!this.productId) {
            await loading.dismiss();
            await this.presentToast('Error: ID de producto no definido para edición.', 'danger');
            return;
        }
        this.productService.updateProduct(this.productId, formData).subscribe(
          async () => {
            await loading.dismiss();
            await this.presentToast('Producto actualizado exitosamente', 'success');
            this.router.navigate(['/products']);
          },
          async error => {
            await loading.dismiss();
            await this.presentToast('Error al actualizar producto', 'danger');
            console.error('Error updating product:', error);
          }
        );
      } else {
        this.productService.createProduct(formData).subscribe(
          async () => {
            await loading.dismiss();
            await this.presentToast('Producto creado exitosamente', 'success');
            this.router.navigate(['/products']);
          },
          async error => {
            await loading.dismiss();
            await this.presentToast('Error al crear producto', 'danger');
            console.error('Error creating product:', error);
          }
        );
      }
    } catch (error) {
      await loading.dismiss();
      await this.presentToast('Ocurrió un error inesperado', 'danger');
      console.error('Unexpected error:', error);
    }
  }

  async presentToast(message: string, color: string = 'primary', duration: number = 2000) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      color: color,
      position: 'bottom'
    });
    toast.present();
  }
}