import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { directus } from 'src/app/services/directus';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  async logIn() {
    await directus.auth
      .refresh()
      .then(() => {
        this.localStorageService.setItem(
          'token',
          directus.storage.auth_token || ''
        );
        this.router.navigateByUrl('/');
      })
      .catch(() => {});
  }

  async logOut() {
    await directus.auth.logout().then(() => {
      this.localStorageService.removeItem('token');
      this.router.navigateByUrl('/login');
    }).catch((err) => {
      this.localStorageService.removeItem('token');
      this.router.navigateByUrl('/login');
    });
  }

  isLoggedIn(): boolean {
    return !!this.localStorageService.getItemValue('token');
  }

  async getCurrentUser() {
    if (this.isLoggedIn()) {
      const currentUser = await directus.users.me.read();
      return currentUser.email;
    }
    return null;
  }
}
