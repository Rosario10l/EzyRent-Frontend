import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalController, IonIcon, IonSpinner, IonContent } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonIcon, IonSpinner, RouterLink],
})
export class LoginModalComponent {
  email = '';
  password = '';
  loading = false;
  showPassword = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private modalCtrl: ModalController,
    private toast: ToastController
  ) { }

  togglePasswordVisibility(field: string) {
    this.showPassword = !this.showPassword;
    const input = document.querySelector(`[name="${field}"]`) as HTMLInputElement;
    if (input) {
      input.type = this.showPassword ? 'text' : 'password';
    }
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
  closeModal() {
    this.modalCtrl.dismiss();
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
