import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  faCircleChevronLeft = faCircleChevronLeft;
  isLoggedIn: boolean = false;
  private localStorageSubscription!: Subscription;
  @Output() sidebarCollapsed = new EventEmitter<boolean>();
  isSidebarCollapsed = true;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    this.sidebarCollapsed.emit(this.isSidebarCollapsed);
  }

  constructor(private localStorageService: LocalStorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.localStorageSubscription = this.localStorageService
      .getLocalStorageChanges()
      .subscribe(() => {
        this.isLoggedIn = this.authService.isLoggedIn();
      });
  }

  ngOnDestroy() {
    this.localStorageSubscription.unsubscribe();
  }
}
