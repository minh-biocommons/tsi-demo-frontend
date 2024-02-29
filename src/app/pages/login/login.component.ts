import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {
  faChevronDown,
  faArrowRight,
  faAnglesUp,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import { ViewportScroller } from '@angular/common';
import { directus } from 'src/app/services/directus';

const sections = 'hero,grid,resources,about';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;
  faArrowRight = faArrowRight;
  faAnglesUp = faAnglesUp;
  heroData!: any;
  resourcesData!: any;
  aboutData!: any;
  gridToolsData!: any;
  gridTSIData!: any;

  windowScrolled = false;
  currentSectionIndex = 0;

  @ViewChildren(sections) sections!: QueryList<ElementRef>;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const activeSection = this.sections
      .toArray()
      .findIndex((section) => this.isElementInViewport(section.nativeElement));

    if (activeSection >= 0) {
      this.currentSectionIndex = activeSection;
    }
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private scroll: ViewportScroller
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.authService.logIn();
    } else {
      this.router.navigateByUrl('/');
    }

    window.addEventListener('scroll', () => {
      this.windowScrolled = window.scrollY !== 0;
    });

    this.getContent();
  }

  async getContent() {
    this.heroData = await directus.items('hero').readByQuery({ sort: ['id'] });
    this.resourcesData = await directus.items('resources_cards').readByQuery({ sort: ['id'] });
    this.gridToolsData = await directus.items('grid_tools').readByQuery({ sort: ['id'] });
    this.gridTSIData = await directus.items('grid_tsi').readByQuery({ sort: ['id'] });
  }

  isElementInViewport(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;

    return !(
      Math.floor(100 - ((rect.top >= 0 ? 0 : rect.top) / +-rect.height) * 100) <
        70 ||
      Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) < 70
    );
  }

  scrollToElement($element: HTMLElement): void {
    $element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  scrollToTop() {
    this.currentSectionIndex = 0;
    this.scroll.scrollToPosition([0, 0]);
  }

  scrollPrevElement(): void {
    if (this.currentSectionIndex <= 1) {
      this.scrollToTop();
    } else {
      this.currentSectionIndex -= 1;
      this.sections
        .toArray()
        [this.currentSectionIndex].nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
    }
  }

  scrollNextElement(): void {
    this.currentSectionIndex < 3 ? (this.currentSectionIndex += 1) : null;
    this.sections
      .toArray()
      [this.currentSectionIndex].nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
  }
}
