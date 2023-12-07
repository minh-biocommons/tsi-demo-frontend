import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('buttonIcon', { read: ElementRef }) buttonIcon!: ElementRef;
  @ViewChild('menu', { read: ElementRef }) menu!: ElementRef;
  @ViewChild('userMenuButton', { read: ElementRef })
  userMenuButton!: ElementRef;
  @Input() isSidebarCollapsed = false;
  @Output() sidebarCollapsed = new EventEmitter<boolean>();

  private localStorageSubscription!: Subscription;

  faCircleUser = faCircleUser;
  currentUser!: string | null;
  isLoggedIn: boolean = false;
  userMenuOpen: boolean = false;

  constructor(
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private renderer: Renderer2
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (
        !this.userMenuButton?.nativeElement.contains(e.target) &&
        !this.menu?.nativeElement.contains(e.target)
      ) {
        this.userMenuOpen = false;
      }
    });
  }

  ngOnInit(): void {
    this.updateNav();
    this.localStorageSubscription = this.localStorageService
      .getLocalStorageChanges()
      .subscribe(() => {
        this.updateNav();
      });
  }

  async updateNav() {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.currentUser = await this.authService.getCurrentUser();
    } else {
      this.currentUser = null;
    }
  }
  
  logOut() {
    this.authService.logOut();
    this.isSidebarCollapsed = false;
    this.sidebarCollapsed.emit(this.isSidebarCollapsed);
  }

  toggleUserMenu(): void {
    this.userMenuOpen = !this.userMenuOpen;
  }

  ngOnDestroy() {
    this.localStorageSubscription.unsubscribe();
  }
}
