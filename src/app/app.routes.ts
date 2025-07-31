import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomeComponent)
  },
  {
  path: 'productos',
  loadComponent: () => import('./components/productos/productos.component').then(m => m.ProductosComponent)
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }

  
];
