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
  {
    path: 'formescalar-a-vendedor',
    loadComponent: () => import('./formescalar-a-vendedor/formescalar-a-vendedor.page').then( m => m.FormescalarAVendedorPage)
  },
  {
    path: 'form-escalar-avendedor',
    loadComponent: () => import('./pages/form-escalar-avendedor/form-escalar-avendedor.page').then( m => m.FormEscalarAVendedorPage)
  },
  {
    path: 'become-rentador',
    loadComponent: () => import('./pages/become-rentador/become-rentador.page').then( m => m.BecomeRentadorPage)
  },
  
];
