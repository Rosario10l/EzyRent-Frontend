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
  path: 'new-product',
  loadComponent: () => import('./new-product/new-product.component').then(m => m.NewProductComponent)
  },
  {
    path: 'detalles/:id',
    loadComponent: () => import('./detalles/detalles.component').then(m => m.DetallesComponent)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },


];
