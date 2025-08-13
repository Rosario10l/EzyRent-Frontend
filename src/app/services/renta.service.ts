import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CreateRentaDto {
  fecha_inicio: string;
  fecha_fin: string;
  cantidad: number;
  estado?: string;
  articuloId: number;
  usuarioId?: number; // Lo enviaremos desde el front
}

@Injectable({
  providedIn: 'root'
})
export class RentaService {
  private apiUrl = 'http://localhost:3000/rentas'; // Ajusta según tu backend

  constructor(private http: HttpClient) {}

  crearRenta(renta: CreateRentaDto): Observable<any> {
    return this.http.post(`${this.apiUrl}`, renta);
  }
}
