import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonContent, HttpClientModule],
})
export class LoginPage   {
  email = '';
  password = '';
  loading = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastController
  ) { }

  ngOnInit() {
  }
  async onLogin() {

    this.loading = true;
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: async (response) => {
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
