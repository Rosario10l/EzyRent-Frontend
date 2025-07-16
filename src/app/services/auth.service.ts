import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'landlord' | 'client';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  
  // Para simular un usuario logueado (en desarrollo)
  constructor() {
    const mockUser: User = {
      id: '1',
      name: 'Usuario Demo',
      email: 'demo@ezirent.com',
      role: 'landlord' // Cambia este valor para probar diferentes roles
    };
    this.currentUserSubject.next(mockUser);
  }

  // Obtiene el usuario actual
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Verifica si es arrendador
  isLandlord(): boolean {
    return this.getCurrentUser()?.role === 'landlord';
  }

  // Verifica si es administrador
  isAdmin(): boolean {
    return this.getCurrentUser()?.role === 'admin';
  }

  // Método de login (deberás adaptarlo a tu backend real)
  login(email: string, password: string): boolean {
    // Lógica de autenticación real iría aquí
    return true;
  }

  // Cierra la sesión
  logout(): void {
    this.currentUserSubject.next(null);
  }
}