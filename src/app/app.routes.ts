import { Routes } from '@angular/router';

export const routes: Routes = [
 {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
  path: 'productos',
  loadComponent: () => import('./components/productos/productos.component').then(m => m.ProductosComponent)
  },
  {
  path: 'erfil',
  loadComponent: () =>
    import('./pages/perfil/perfil.component').then(m => m.PerfilComponent)
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }

];
