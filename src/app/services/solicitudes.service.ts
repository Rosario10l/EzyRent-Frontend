import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from './auth.service';

interface Solicitud {
  id: number;
  usuarioId: string;
  estado: 'pendiente' | 'aprobado' | 'rechazado';
}
@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {
  private apiUrl = environment.apiUrl;
  private solicutdesSubject = new BehaviorSubject<Solicitud[]>([]);
  solicitudes = this.solicutdesSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) { }

  crearSolicitud(data: any) {
    const token = this.authService.getToken();
    const user = this.authService.getCurrentUser();
    if (!token || !user) {
      throw new Error('No se ha encontrado un token de autenticación');
    }
    const payload = {
      ...data,
      usuarioId: user.id
    };
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  );
    return this.http.post(`${this.apiUrl}solicitud-rentador`, payload, { headers });
  }

  obtenerTodas() {
    return this.http.get<Solicitud[]>(`${this.apiUrl}solicitud-rentador`).pipe(
      tap((solicitudes) => this.solicutdesSubject.next(solicitudes))
    );
  }
  aprobarSolitud(id: number) {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.patch(`${this.apiUrl}solicitud-rentador/${id}/aprobar`, {}, { headers });
  }
  rechazarSolicitud(id: number) {
    return this.http.patch(`${this.apiUrl}solicitud-rentador/${id}/rechazar`, {});
  }
  tieneSolicitudPendiente(usuarioId: string) {
    return this.http.get<boolean>(`${this.apiUrl}solicitud-rentador/pendiente/${usuarioId}`);
  }
}
