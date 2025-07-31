import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonSpinner, IonIcon } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonIcon, IonContent, CommonModule, FormsModule, HttpClientModule, IonIcon, IonSpinner, RouterLink]
})
export class RegisterPage {
  isDarkMode = false;
  nombre = '';
  email = '';
  password = '';
  loading = false;
  showPassword = false;
  constructor(
    private router: Router,
    private toast: ToastController,
    private authService: AuthService
  ) { }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  togglePasswordVisibility(field: string) {
    this.showPassword = !this.showPassword;
    const input = document.querySelector(`[name="${field}"]`) as HTMLInputElement;
    if (input) {
      input.type = this.showPassword ? 'text' : 'password';
    }
  }

  ngOnInit() {
    this.checkDarkMode();
    // Escuchar cambios en la preferencia de color
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      this.checkDarkMode();
    });
  }
  checkDarkMode() {
    this.isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  async onRegister() {
    this.loading = true;

    // Solo envía los campos que el backend espera
    const userData = {
      nombre: this.nombre,
      email: this.email,
      password: this.password
    };

    this.authService.register(userData).subscribe({
      next: async (response) => {
        this.loading = false;
        await this.showToast('Registro exitoso');
        this.router.navigate(['/login']);
      },
      error: async (error) => {
        this.loading = false;
        let errorMessage = 'Error al registrar';

        // Muestra el mensaje de error del backend
        if (error.error?.message) {
          errorMessage = Array.isArray(error.error.message)
            ? error.error.message.join(', ')
            : error.error.message;
        }

        await this.showToast(errorMessage);
        console.error('Detalles del error:', error);
      }
    });
  }
  private async showToast(message: string) {
    const toast = await this.toast.create({
      message,
      duration: 2000,
      color: 'dark',
    });
    await toast.present();
  }

}
