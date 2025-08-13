import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonAvatar, IonHeader, IonTitle, IonToolbar, IonIcon, IonItem, IonLabel, IonCard, IonCardHeader, IonButtons, IonCardContent, IonCardTitle } from '@ionic/angular/standalone';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SolicitudesService } from '../../services/solicitudes.service';
import { callOutline, documentTextOutline, homeOutline, personOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-solicitud-rentador-detalle',
  templateUrl: './solicitud-rentador-detalle.page.html',
  styleUrls: ['./solicitud-rentador-detalle.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonAvatar, IonLabel, IonItem, IonIcon]
})
export class SolicitudRentadorDetallePage implements OnInit {
  solicitud: any;
  isLoading: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private SolicitudesService: SolicitudesService
  ) {
    addIcons({ personOutline, callOutline, homeOutline, documentTextOutline });
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.SolicitudesService.obtenerTodas().subscribe({
      next: (solicitudes) => {
        this.solicitud = solicitudes.find(s => s.id === id);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al obtener la solicitud:', error);
        this.isLoading = false;
      }
    });
  }

}
