import {
  Component,
  signal,
  AfterViewInit,
  ElementRef,
  inject,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Solution {
  id:          string;
  icon:        string;
  title:       string;
  description: string;
  highlight:   boolean;
}

/**
 * SolutionsComponent
 * Displays the four core platform capabilities in a bento-style grid.
 * Highlighted card uses the primary gradient; others use glass styling.
 */
@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.scss'],
})
export class SolutionsComponent implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef);
  private observer!: IntersectionObserver;

  readonly visible   = signal(false);
  readonly activeSol = signal<string | null>(null);

  readonly solutions: Solution[] = [
    {
      id: 'planning',
      icon: `<svg viewBox="0 0 40 40" fill="none">
        <rect x="6" y="6" width="28" height="28" rx="3" stroke="currentColor" stroke-width="1.8"/>
        <path d="M13 20 L18 25 L27 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M13 13 H27 M13 27 H20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>`,
      title: 'Campaign Planning',
      description: 'Plan and optimise your ad campaigns with data-driven insights and seamless collaboration for maximum impact across every channel.',
      highlight: false,
    },
    {
      id: 'buying',
      icon: `<svg viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="14" stroke="currentColor" stroke-width="1.8"/>
        <path d="M20 12 V20 L26 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="20" cy="20" r="2" fill="currentColor"/>
      </svg>`,
      title: 'Media Buying',
      description: 'Effortlessly book media slots with AI-powered automation, ensuring cost efficiency and better reach with zero manual overhead.',
      highlight: false,
    },
    {
      id: 'distribution',
      icon: `<svg viewBox="0 0 40 40" fill="none">
        <circle cx="8"  cy="20" r="4" stroke="currentColor" stroke-width="1.8"/>
        <circle cx="32" cy="10" r="4" stroke="currentColor" stroke-width="1.8"/>
        <circle cx="32" cy="30" r="4" stroke="currentColor" stroke-width="1.8"/>
        <path d="M12 20 L28 12 M12 20 L28 28" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>`,
      title: 'Ad Distribution',
      description: 'Distribute ads across multiple channels while ensuring precise targeting and real-time performance tracking.',
      highlight: true,
    },
    {
      id: 'analytics',
      icon: `<svg viewBox="0 0 40 40" fill="none">
        <path d="M8 32 L8 20 L16 20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16 32 L16 14 L24 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M24 32 L24 8 L32 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M32 32 L32 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M6 32 H34" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>`,
      title: 'Performance Analytics',
      description: 'Gain actionable insights with real-time performance tracking to maximise ROI and refine future strategies continuously.',
      highlight: false,
    },
  ];

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) this.visible.set(true); },
      { threshold: 0.1 }
    );
    this.observer.observe(this.host.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
