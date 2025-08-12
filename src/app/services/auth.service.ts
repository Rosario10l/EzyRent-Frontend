import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

 export interface User {
  id: string;
  name: string;
  email: string;
  rol: 'admin' | 'usuario';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');
    this.isAuthenticated.next(!!token);

    const userData = localStorage.getItem('user');
    if (userData) {
      this.currentUserSubject.next(JSON.parse(userData));
    }
  }

 login(credentials: { email: string; password: string }) {
  return this.http.post(`${this.apiUrl}usuario/login`, credentials).pipe(
    tap((response: any) => {
      if (response.access_token) {
        localStorage.setItem('token', response.access_token);
        this.isAuthenticated.next(true);

        if (response.user) {
          // Transformar user para que tenga 'name' y 'rol'
          const userToStore = {
            id: response.user.id,
            name: response.user.nombre,   // cambiar 'nombre' a 'name'
            email: response.user.email,
            rol: response.user.rol        // asegurar que el rol venga y se guarde
          };
          localStorage.setItem('user', JSON.stringify(userToStore));
          this.currentUserSubject.next(userToStore);
        }
      }
    })
  );
}

register(userData: any) {
  return this.http.post(`${this.apiUrl}usuario/register`, userData).pipe(
    tap((response: any) => {
      if (response.token) {
        localStorage.setItem('token', response.token);
        this.isAuthenticated.next(true);

        if (response.user) {
          const userToStore = {
            id: response.user.id,
            name: response.user.nombre,
            email: response.user.email,
            rol: response.user.rol
          };
          localStorage.setItem('user', JSON.stringify(userToStore));
          this.currentUserSubject.next(userToStore);
        }
      }
    })
  );
}


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isAuthenticated.next(false);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getAuthStatus() {
    return this.isAuthenticated.asObservable();
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAdmin(): boolean {
  const user = this.getCurrentUser();
  return user !== null && user.rol === 'admin';
}

}
