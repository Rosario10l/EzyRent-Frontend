import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  es_rentador: number;
  // agrega aquí otros campos que necesites
}

@Injectable({
  providedIn: 'root'
})


export class UsuariosService {


  private apiUrl = 'http://localhost:3000/usuario';

  constructor(private http: HttpClient,private router : Router

  ) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

getOne(id: number): Observable<Usuario> {
  return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
}


  create(data: any): Observable<any> {
   return this.http.post<any>(`${this.apiUrl}`, data);

  }

  update(id: number, data: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
