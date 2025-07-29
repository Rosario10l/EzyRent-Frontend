import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'resenias',
    pathMatch: 'full',
  },
  {
    path: 'resenias',
    loadComponent: () => import('./resenias/resenias.page').then( m => m.ReseniasPage)
  },

];
