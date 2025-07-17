import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private apiUrl = 'http://localhost:3000/categories';

  constructor(private http: HttpClient) {}

  createCategory(data: { name: string; description?: string }) {
    return this.http.post(this.apiUrl, data).toPromise();
  }
}
