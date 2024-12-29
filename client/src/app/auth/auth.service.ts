import { Injectable } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  private storage: Storage | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.storage = window.localStorage;
      try {
        const userToken = this.storage.getItem('userToken');
        if (userToken) {
          this.isLoggedIn = true;
        }
      } catch (error) {
        console.error('Local storage is not available:', error);
      }
    }
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  login(token: string): void {
    this.isLoggedIn = true;
    if (this.storage) {
      try {
        this.storage.setItem('userToken', token);
      } catch (error) {
        console.error('Error saving to local storage:', error);
      }
    }
  }

  logout(): void {
    this.isLoggedIn = false;
    if (this.storage) {
      try {
        this.storage.removeItem('userToken');
      } catch (error) {
        console.error('Error removing from local storage:', error);
      }
    }
  }
}