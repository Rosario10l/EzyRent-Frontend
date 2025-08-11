import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private api = 'http://localhost:3000/usuario';

  constructor(private http: HttpClient) {}

  obtenerUsuario(id: number) {
    return this.http.get(`${this.api}/${id}`);
  }
}
