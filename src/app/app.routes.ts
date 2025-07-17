import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'new-category',
    loadComponent: () => import('./pages/new-category/new-category.page').then( m => m.NewCategoryPage)
  },
  
];
