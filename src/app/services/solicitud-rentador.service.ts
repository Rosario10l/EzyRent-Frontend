import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface CreateSolicitudRentadorDto {
  usuarioId: number;        // <- Agrega usuarioId
  direccion: string;
  telefono: string;
  identificacion_url?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SolicitudRentadorService {
  private apiUrl = 'http://localhost:3000/solicitud-rentador';

  constructor(private http: HttpClient) {}

  crearSolicitud(dto: CreateSolicitudRentadorDto): Observable<any> {
    return this.http.post<any>(this.apiUrl, dto);
  }
}

