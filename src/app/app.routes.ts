import { Routes } from '@angular/router';

export const routes: Routes = [
 {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'resenias',
    loadComponent: () => import('./resenias/resenias.page').then( m => m.ReseniasPage)
  },
    {
  path: 'productos',
  loadComponent: () => import('./components/productos/productos.component').then(m => m.ProductosComponent)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },


];
