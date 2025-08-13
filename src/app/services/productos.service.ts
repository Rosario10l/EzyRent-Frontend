import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // <-- NUEVO

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private apiUrl = 'http://localhost:3000/articulo';

  constructor(private http: HttpClient, private router: Router) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getOne(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
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

  // =========================
  // 👇👇  AGREGADO PARA CALENDARIO  👇👇
  // =========================

  /**
   * Convierte tus artículos en eventos para FullCalendar.
   * Soporta nombres de campos: 'fecha_inicio'|'fechaInicio' y 'fecha_fin'|'fechaFin'.
   * Si las fechas vienen como 'YYYY-MM-DD', asume allDay y suma 1 día al end (exclusivo).
   */
  getCalendarEvents(): Observable<ProductoEvent[]> {
    return this.getAll().pipe(
      map((lista) =>
        (lista ?? [])
          .filter(a => this.extractStart(a) && this.extractEnd(a))
          .map(a => {
            const start = this.extractStart(a)!;
            const endRaw = this.extractEnd(a)!;

            const allDay = this.isDateOnly(start) && this.isDateOnly(endRaw);
            const end = allDay ? this.addOneDay(endRaw) : endRaw;

            return {
              id: String(a.id ?? a._id ?? Math.random()),
              title: a.nombre ?? a.titulo ?? 'Producto',
              start,
              end,
              allDay,
              // Colores opcionales por categoría (puedes quitar estas 2 líneas si no quieres colores)
              backgroundColor: this.colorPorCategoria(a?.categoria),
              borderColor: this.colorPorCategoria(a?.categoria),
            } as ProductoEvent;
          })
      )
    );
  }

  // ---- helpers privados (mínimos) ----
  private extractStart(a: any): string | undefined {
    return a?.fecha_inicio || a?.fechaInicio;
  }
  private extractEnd(a: any): string | undefined {
    return a?.fecha_fin || a?.fechaFin;
  }
  private isDateOnly(s: string): boolean {
    return /^\d{4}-\d{2}-\d{2}$/.test(s);
  }
  private addOneDay(dateStr: string): string {
    const d = new Date(dateStr + 'T00:00:00');
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10); // 'YYYY-MM-DD'
  }
  private colorPorCategoria(cat: any): string {
    const nombre = typeof cat === 'string' ? cat : cat?.nombre;
    if (!nombre) return '#4f46e5'; // indigo
    const key = (nombre as string).toLowerCase();
    if (key.includes('electr')) return '#2563eb'; // azul
    if (key.includes('herram')) return '#16a34a'; // verde
    if (key.includes('ropa'))   return '#db2777'; // rosa/coral
    return '#4f46e5';
  }
}

// Tipado opcional para usar en tu calendario
export interface ProductoEvent {
  id: string;
  title: string;
  start: string; // ISO o 'YYYY-MM-DD'
  end: string;   // ISO o 'YYYY-MM-DD' (exclusivo si allDay)
  allDay: boolean;
  backgroundColor?: string;
  borderColor?: string;
}
