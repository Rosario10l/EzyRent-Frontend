import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-calendar-productos',
  standalone: true,
  templateUrl: './calendar-productos.page.html',
  styleUrls: ['./calendar-productos.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class CalendarProductosPage implements OnDestroy {
  @ViewChild('calHost', { static: true }) calHost!: ElementRef<HTMLDivElement>;
  private calendar?: Calendar;

  /** Bandera global anti-HMR para esta página */
  private get alreadyRendered(): boolean { return (window as any).__fcRendered === true; }
  private set alreadyRendered(v: boolean) { (window as any).__fcRendered = v; }

  /** Se llama cada vez que entras a la vista en Ionic */
  ionViewDidEnter() {
    // 1) Si hay una instancia previa (de HMR o navegación), destrúyela
    const prev: Calendar | undefined = (window as any).__fcInstance;
    if (prev) { try { prev.destroy(); } catch {} }
    (window as any).__fcInstance = undefined;

    // 2) Limpia el host por completo (por si quedó markup duplicado)
    const host = this.calHost.nativeElement;
    host.replaceChildren(); // elimina todos los nodos hijos

    // 3) Evita doble render si el HMR llama otra vez
    if (this.alreadyRendered && this.calendar) return;

    // 4) Crea UNA SOLA instancia y renderiza
    this.calendar = new Calendar(host, {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      locale: esLocale,
      firstDay: 1,
      height: 'auto',
      headerToolbar: { left: 'prev,next today', center: 'title', right: '' },
      dayMaxEvents: true,
      // Eventos demo; puedes dejarlo [] si quieres vacío
      events: [
        { id: '1', title: 'Ejemplo A', start: '2025-08-05', end: '2025-08-08', allDay: true },
        { id: '2', title: 'Ejemplo B', start: '2025-08-15', end: '2025-08-16', allDay: true },
      ],
    });

    this.calendar.render();

    // 5) Guarda refs globales (protección extra contra HMR)
    (window as any).__fcInstance = this.calendar;
    this.alreadyRendered = true;
  }

  /** Limpia al salir de la página (muy importante con ion-router-outlet) */
  ionViewWillLeave() {
    try { this.calendar?.destroy(); } catch {}
    this.calendar = undefined;
    this.calHost.nativeElement.replaceChildren();
    (window as any).__fcInstance = undefined;
    this.alreadyRendered = false;
  }

  ngOnDestroy(): void {
    try { this.calendar?.destroy(); } catch {}
    this.calendar = undefined;
    (window as any).__fcInstance = undefined;
    this.alreadyRendered = false;
  }
}
