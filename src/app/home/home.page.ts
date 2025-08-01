import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CurrencyPipe], 
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomeComponent {
  productos = [
    { nombre: 'Tenis Adidas Classic', precio: 999, imagen: 'assets/adidas1.jpg' },
    { nombre: 'Tenis Nike Air', precio: 1200, imagen: 'assets/nike1.jpg' },
    { nombre: 'Fila Running', precio: 890, imagen: 'assets/fila1.jpg' },
  ];

  constructor(private router: Router) {}

  verCategoria(nombre: string) {
    this.router.navigate(['/productos'], { queryParams: { categoria: nombre } });
  }
}
