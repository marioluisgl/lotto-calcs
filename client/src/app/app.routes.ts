import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    title: 'Auth - Register',
    loadComponent: () => import('./components/register/register.component'),
  },
  {
    path: 'home',
    title: 'Lotto - Home',
    canActivate: [AuthGuard],
    loadComponent: () => import('./components/home/home.component'),
  },
  {
    path: 'dashboard/:id',
    title: 'Lotto - Dashboard',
    canActivate: [AuthGuard],
    loadComponent: () => import('./components/dashboard/dashboard.component'),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: '**',
    redirectTo: 'home', // or not found page 
  },
];
