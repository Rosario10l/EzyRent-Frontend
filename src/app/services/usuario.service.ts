import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod'; // Igual que en AuthService

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private apiUrl = environment.apiUrl; // Usamos la misma convención que AuthService

  constructor(private http: HttpClient) {}

  obtenerUsuario(id: number) {
    return this.http.get(`${this.apiUrl}usuario/${id}`);
  }

  // Si quieres también obtener artículos de ese usuario
  obtenerArticulosDeUsuario(id: number) {
    return this.http.get(`${this.apiUrl}articulo?rentadorId=${id}`);
  }
}
