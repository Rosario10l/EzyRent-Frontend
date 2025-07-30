import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;
  private isAuthenticated = new BehaviorSubject<boolean>(false);


  constructor(private http: HttpClient, private router : Router) {
    const token = localStorage.getItem('token');
    this.isAuthenticated.next(!!token);
  }
  login(credentials: { email: string; password: string }) {
     console.log('URL:', `${this.apiUrl}usuario/login`);
    return this.http.post(`${this.apiUrl}usuario/login`, credentials).pipe(
      tap((response: any) => {
        if (response.access_token) {
          localStorage.setItem('token', response.access_token);
          this.isAuthenticated.next(true);
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
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }

  getAuthStatus() {
    return this.isAuthenticated.asObservable();
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

}
