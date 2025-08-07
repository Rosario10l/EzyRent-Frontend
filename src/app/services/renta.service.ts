import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Renta {
  articuloId: number;
  cantidad: number;
  fecha_inicio: string;
  fecha_fin: string;
}

@Injectable({
  providedIn: 'root'
})
export class RentaService {


  private apiUrl = 'http://localhost:3000/rentas';

  constructor(private http: HttpClient) { }
  crearRenta(renta: Renta): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(this.apiUrl, renta, httpOptions);
  }
}
