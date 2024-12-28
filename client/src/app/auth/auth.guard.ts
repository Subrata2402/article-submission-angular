import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const isLoggedIn = !!localStorage.getItem('userToken'); // Check if user is logged in
    if (isLoggedIn && (state.url === '/login' || state.url === '/register')) {
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }
}