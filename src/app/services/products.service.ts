import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core'; 

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/articulo'; 

  constructor(private http: HttpClient) {}

  // Obtener todos los artículos
  getArticulos(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(this.apiUrl);
  }

  // Obtener artículo por ID
  getArticuloById(id: string): Observable<Articulo> {
    return this.http.get<Articulo>(`${this.apiUrl}/${id}`);
  }

  // Obtener artículos por propietario
  getArticulosByOwner(ownerId: string): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(`${this.apiUrl}/owner/${ownerId}`);
  }

  // Crear un artículo
  createArticulo(formData: FormData): Observable<Articulo> {
    return this.http.post<Articulo>(this.apiUrl, formData);
  }

  // Actualizar un artículo
  updateArticulo(id: string, formData: FormData): Observable<Articulo> {
    return this.http.put<Articulo>(`${this.apiUrl}/${id}`, formData);
  }

  // Eliminar un artículo
  deleteArticulo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Obtener artículos por categoría (nuevo método)
  getArticulosByCategoria(categoriaId: number): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(`${this.apiUrl}/categoria/${categoriaId}`);
  }
  
}

export interface Articulo { 
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad_total: number;
  cantidad_disponible: number;
  imagen_url?: string;
  fecha_publicacion: Date;
  activo: boolean;
  rentador: { 
    id: number;
    nombre: string;
  };
  categoria: { 
    id: number;
    nombre: string; 
  };
}