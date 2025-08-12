import { Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [

  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then((m) => m.RegisterPage),
  },
    {
    path: 'solictud',
    loadComponent: () => import('./pages/solictud/solictud.page').then( m => m.SolictudPage),
    canActivate: [AuthGuard,AdminGuard],
  },
    {
    path: 'solicitud-rentador',
    loadComponent: () => import('./pages/solicitud-rentador/solicitud-rentador.page').then( m => m.SolicitudRentadorPage)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },




];
