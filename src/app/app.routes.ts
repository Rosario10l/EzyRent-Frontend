import { Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
 {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
  path: 'productos',
  loadComponent: () => import('./components/productos/productos.component').then(m => m.ProductosComponent)
  },
];
