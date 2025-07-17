import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-new-category',
  templateUrl: './new-category.page.html',
  styleUrls: ['./new-category.page.scss'],
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class NewCategoryPage implements OnInit {
  categoryForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });
  }

  async onSubmit() {
    console.log('Formulario enviado:', this.categoryForm.value); // ✅ ¿Esto se imprime?

    try {
      await this.categoriaService.createCategory(this.categoryForm.value);
      const toast = await this.toastCtrl.create({
        message: 'Categoría creada exitosamente',
        duration: 2000,
        color: 'success',
      });
      toast.present();
      this.categoryForm.reset();
    } catch (error) {
      console.error('Error al guardar:', error);
      const toast = await this.toastCtrl.create({
        message: 'Error al guardar categoría',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  }
}
