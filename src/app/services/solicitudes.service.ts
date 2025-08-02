import { HttpClient } from '@angular/common/http';
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
    return this.http.post(`${this.apiUrl}solicitud`, data);
  }

  obtenerTodas() {
    return this.http.get<Solicitud[]>(`${this.apiUrl}solicitud`).pipe(
      tap((solicitudes) => this.solicutdesSubject.next(solicitudes))
    );
  }
  aprobarSolitud(id: number) {
    return this.http.patch(`${this.apiUrl}solicitud/${id}/aprobar`, {});
  }
  rechazarSolicitud(id: number) {
    return this.http.patch(`${this.apiUrl}solicitud/${id}/rechazar`, {});
  }
  tieneSolicitudPendiente(usuarioId: string) {
    return this.http.get<boolean>(`${this.apiUrl}solicitud/pendiente/${usuarioId}`);
  }

}
