import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonSpinner } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import 'animate.css';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonContent, HttpClientModule, IonIcon, IonSpinner, RouterLink],
})
export class LoginPage {
  email = '';
  password = '';
  loading = false;
  showPassword = false;
  isDarkMode = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastController
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
  async onLogin() {

    this.loading = true;
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: async (response) => {
        console.log('Respuesta login:', response);
        this.loading = false;
        await this.showToast('Inicio de sesión exitoso');
        this.router.navigate(['/home']);
      },
      error: async (error) => {
        this.loading = false;
        await this.showToast('Error al iniciar sesión. Verifica tus credenciales.');
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
