import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'register',
    title: 'Auth - Register',
    loadComponent: () => import('./components/auth/register/register.component'),
  },
  {
    path: 'login',
    title: 'Auth - Login',
    loadComponent: () => import('./components/auth/login/login.component'),
  },
  {
    path: 'home',
    title: 'Lotto - Home',
    loadComponent: () => import('./components/home/home.component'),
  },
  {
    path: 'dashboard/:id',
    title: 'Lotto - Dashboard',
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
