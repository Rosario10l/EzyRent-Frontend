import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

export interface product{
  id?: number;
  nombre: string;
  description: string;
  precio: number;
  cantidad_total: number;
  catidad_disponible: number;
  imagen_url: string;
}

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private apiUrl = 'http://tu-backend-api.com/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductsByOwner(ownerId: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/owner/${ownerId}`);
  }

  createProduct(product: FormData): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: string, product: FormData): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}