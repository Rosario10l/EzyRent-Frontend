import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class RegisterComponent implements OnInit {

  userData = {
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() { }

  async register() {
    if (this.userData.password !== this.userData.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }
    try {
      const newUser = {
        nombre: this.userData.nombre,
        email: this.userData.email,
        password: this.userData.password,
        rol: 'usuario',
        es_rentador: false
      };
      const user = await this.authService.register(newUser);
      if (user) {
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.error('Registration failed', error);

    }

  }
}
