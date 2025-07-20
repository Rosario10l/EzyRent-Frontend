import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule,HttpClientModule]
})
export class RegisterPage   {
  nombre = '';
  email = '';
  password = '';
  loading = false;

  constructor(
    private router: Router,
    private toast: ToastController,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }
   async onRegister() {
    this.loading = true;
    const userData = {
      nombre: this.nombre,
      email: this.email,
      password: this.password,
      rol: 'usuario',
      re_rentador: false
    };

    this.authService.register(userData).subscribe({
      next: async (response) => {
        this.loading = false;
        await this.showToast('Registro exitoso');
        this.router.navigate(['/login']);
      },
      error: async (error) => {
        this.loading = false;
        await this.showToast('Error al registrar. Verifica tus datos.');
        console.error('register error:', error);

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
