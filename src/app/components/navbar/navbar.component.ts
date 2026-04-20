import {
  Component,
  signal,
  computed,
  HostListener,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface NavLink {
  label: string;
  href: string;
}

/**
 * NavbarComponent
 * - Sticky navigation that becomes opaque on scroll
 * - Mobile hamburger menu with animated drawer
 * - Active section highlighting via Intersection Observer
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  /** Reactive signals for UI state */
  readonly scrolled    = signal(false);
  readonly menuOpen    = signal(false);
  readonly activeLink  = signal('platform');

  readonly navLinks: NavLink[] = [
    { label: 'The Platform', href: '#platform' },
    { label: 'Features',     href: '#features'  },
    { label: 'Benefits',     href: '#benefits'  },
    { label: 'Request a Demo', href: '#demo'    },
    { label: 'Contact Us',   href: '#contact'   },
    { label: 'About Us',     href: '#about'     },
  ];

  /** Computed: navbar classes based on scroll and menu state */
  readonly navClass = computed(() => ({
    'navbar--scrolled': this.scrolled(),
    'navbar--open':     this.menuOpen(),
  }));

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 40);
  }

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  scrollTo(href: string, event: Event): void {
    event.preventDefault();
    this.closeMenu();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.activeLink.set(id);
  }
}
