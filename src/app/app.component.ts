import { Component } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  title = 'directus-angular-example';
  localStorageSubscription!: Subscription;
  isSidebarCollapsed = true;
  isLoggedIn = true;

  constructor(private localStorageService: LocalStorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.localStorageSubscription = this.localStorageService
      .getLocalStorageChanges()
      .subscribe(() => {
        this.isLoggedIn = this.authService.isLoggedIn();
      });
  }

  handleSidebarCollapsed(e: any) {
    this.isSidebarCollapsed = e;
  }

  ngOnDestroy() {
    this.localStorageSubscription.unsubscribe();
  }
}
