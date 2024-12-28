import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent), canActivate: [AuthGuard] },
  { path: 'register', loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent), canActivate: [AuthGuard] },
  { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent), canActivate: [AuthGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
