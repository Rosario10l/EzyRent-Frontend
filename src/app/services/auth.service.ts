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


  constructor(private http: HttpClient, private router : Router) {}
  login(credentials: { email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.isAuthenticated.next(true);
        }
      })
    );
  }

  register(userData: any) {
    return this.http.post(`${this.apiUrl}/usuario`, userData).pipe(
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

}
