import { Component, inject, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonText, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonLabel, IonBadge } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss'],
  imports:[ CommonModule,
    IonicModule]
})
export class DetallesComponent  {

 private route = inject(ActivatedRoute);
  private productosService = inject(ProductosService);

  producto: any;

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productosService.getOne(id).subscribe(data => {
      this.producto = data;
    });
  }
}
