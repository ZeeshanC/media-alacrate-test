import {
  Component,
  signal,
  AfterViewInit,
  ElementRef,
  inject,
  OnDestroy,
  viewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ServiceCard {
  id:          string;
  tag:         string;
  title:       string;
  description: string;
  icon:        string;
  accent:      string;
  link:        string;
}

/**
 * ServicesComponent
 * Showcases the three audience pillars: Advertisers, Agencies, Media Owners.
 * Cards animate in on scroll via IntersectionObserver.
 */
@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef);
  private observer!: IntersectionObserver;

  readonly visible = signal(false);
  readonly activeCard = signal<string | null>(null);

  readonly services: ServiceCard[] = [
    {
      id: 'advertisers',
      tag: 'FOR BRANDS',
      title: 'Advertisers',
      description: 'Reach your ideal audience across multiple platforms with precision targeting and real-time campaign analytics.',
      icon: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="20" stroke="currentColor" stroke-width="2"/>
        <path d="M16 28 C16 28 18 20 24 20 C30 20 32 28 32 28" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <circle cx="24" cy="17" r="3" fill="currentColor"/>
        <path d="M14 34 H34" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
      accent: '#ff2d5e',
      link: '#advertisers',
    },
    {
      id: 'agencies',
      tag: 'FOR AGENCIES',
      title: 'Agencies',
      description: 'Streamline campaign planning and media buying for your clients with our all-in-one platform and collaboration tools.',
      icon: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="14" width="32" height="22" rx="3" stroke="currentColor" stroke-width="2"/>
        <path d="M16 14 V10 C16 9 17 8 18 8 H30 C31 8 32 9 32 10 V14" stroke="currentColor" stroke-width="2"/>
        <circle cx="24" cy="26" r="5" stroke="currentColor" stroke-width="2"/>
        <path d="M12 26 H19 M29 26 H36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
      accent: '#ff6b35',
      link: '#agencies',
    },
    {
      id: 'media-owners',
      tag: 'FOR PUBLISHERS',
      title: 'Media Owners',
      description: 'Maximise your inventory revenue by connecting with top advertisers through seamless, automated media transactions.',
      icon: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="8" width="14" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
        <rect x="26" y="8" width="14" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
        <rect x="8" y="26" width="14" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
        <rect x="26" y="26" width="14" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
        <circle cx="33" cy="33" r="3" fill="currentColor"/>
      </svg>`,
      accent: '#c0392b',
      link: '#media-owners',
    },
  ];

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) this.visible.set(true); },
      { threshold: 0.15 }
    );
    this.observer.observe(this.host.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  setActive(id: string | null): void {
    this.activeCard.set(id);
  }
}
