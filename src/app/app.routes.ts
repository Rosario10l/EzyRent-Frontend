import { Routes } from '@angular/router';

export const routes: Routes = [
   {
    path: '',
    redirectTo: '/product',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'product',
    loadComponent: () => import('./pages/products/components/product-list/product-list.component').then((m) => m.ProductListComponent),
  },
  {
    path: 'ProductForm', 
    loadComponent: () => import('./pages/products/components/product-form/product-form.component').then((m) => m.ProductFormComponent),
    
  }
  
];
