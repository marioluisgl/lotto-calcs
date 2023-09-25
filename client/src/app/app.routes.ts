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
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
  {
    path: '**',
    redirectTo: 'library', // not found page
  },
];
