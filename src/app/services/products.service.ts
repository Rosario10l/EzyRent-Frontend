import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Articulo {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad_total: number;
  cantidad_disponible: number;
  imagen_url?: string;
  fecha_publicacion: Date;
  activo: Boolean;
  rentador: { 
    id: number;
    nombre: string;  };
  categoria: { 
    id: number;
    nombre: string; 
  };
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/articulo'; 

  constructor(private http: HttpClient) {}

  getArticulos(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(this.apiUrl);
  }

  getArticuloById(id: string): Observable<Articulo> {
    return this.http.get<Articulo>(`${this.apiUrl}/${id}`);
  }

  getArticulosByOwner(ownerId: string): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(`${this.apiUrl}/owner/${ownerId}`);
  }

   createArticulo(formData: FormData): Observable<Articulo> {
     return this.http.post<Articulo>(this.apiUrl, formData);
  }

  updateArticulo(id: string, formData: FormData): Observable<Articulo> {
    return this.http.put<Articulo>(`${this.apiUrl}/${id}`, formData);
  }

  deleteArticulo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}