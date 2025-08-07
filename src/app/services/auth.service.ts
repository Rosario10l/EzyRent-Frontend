import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'landlord' | 'client';
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
    console.log('URL:', `${this.apiUrl}usuario/login`);
    return this.http.post(`${this.apiUrl}usuario/login`, credentials).pipe(
      tap((response: any) => {
        if (response.access_token) {
          localStorage.setItem('token', response.access_token);
          this.isAuthenticated.next(true);

          if (response.user) {
            localStorage.setItem('user', JSON.stringify(response.user));
            this.currentUserSubject.next(response.user);
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
            localStorage.setItem('user', JSON.stringify(response.user));
            this.currentUserSubject.next(response.user);
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

  isLandlord(): boolean {
    return this.getCurrentUser()?.role === 'landlord';
  }

  isAdmin(): boolean {
    return this.getCurrentUser()?.role === 'admin';
  }
}
