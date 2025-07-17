import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: ''
  };
  constructor(
    private router: Router,
    private authService: AuthService

  ) { }

  ngOnInit() { }
  async login() {
    try {
      const user = await this.authService.login(this.credentials);
      if (user) {
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.error('Login failed', error);}
  }
    loginWithGoogle() {
    // Implementar lógica de Google Auth
  }
}
