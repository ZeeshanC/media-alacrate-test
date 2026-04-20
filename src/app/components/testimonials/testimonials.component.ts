import {
  Component,
  signal,
  computed,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Testimonial {
  id:      number;
  name:    string;
  role:    string;
  company: string;
  avatar:  string;
  quote:   string;
  rating:  number;
}

/**
 * TestimonialsComponent
 * Auto-rotating testimonial carousel with manual dot navigation.
 * Pauses on hover for better UX.
 */
@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef);
  private ioObserver!: IntersectionObserver;
  private autoplayTimer: ReturnType<typeof setInterval> | null = null;

  readonly visible  = signal(false);
  readonly current  = signal(0);
  readonly paused   = signal(false);

  readonly testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      role: 'Head of Marketing',
      company: 'NovaBrand Co.',
      avatar: 'SM',
      quote: 'Media Alacarte completely transformed how we approach media buying. The AI-powered automation saved us 40% on our ad spend while doubling our reach. Genuinely impressive.',
      rating: 5,
    },
    {
      id: 2,
      name: 'James Okafor',
      role: 'Media Director',
      company: 'PulseMedia Agency',
      avatar: 'JO',
      quote: 'Managing 15+ client campaigns simultaneously was a nightmare before this platform. Now it\'s seamless. The real-time analytics alone are worth every penny.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Priya Nair',
      role: 'Publisher Relations',
      company: 'ClearChannel Digital',
      avatar: 'PN',
      quote: 'As a media owner, filling inventory used to be time-consuming. Media Alacarte connects us with the right advertisers instantly. Revenue up 60% in Q1.',
      rating: 5,
    },
    {
      id: 4,
      name: 'Carlos Mendez',
      role: 'Growth Lead',
      company: 'Axiom Ventures',
      avatar: 'CM',
      quote: 'The campaign planning tools are intuitive, powerful, and built for teams. Our agency\'s efficiency has gone through the roof since onboarding.',
      rating: 5,
    },
  ];

  readonly prev = computed(() =>
    (this.current() - 1 + this.testimonials.length) % this.testimonials.length
  );
  readonly next = computed(() =>
    (this.current() + 1) % this.testimonials.length
  );

  ngAfterViewInit(): void {
    this.ioObserver = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) this.visible.set(true); },
      { threshold: 0.15 }
    );
    this.ioObserver.observe(this.host.nativeElement);
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.ioObserver?.disconnect();
    this.stopAutoplay();
  }

  goTo(index: number): void {
    this.current.set(index);
  }

  goNext(): void {
    this.current.set(this.next());
  }

  goPrev(): void {
    this.current.set(this.prev());
  }

  setPaused(val: boolean): void {
    this.paused.set(val);
    val ? this.stopAutoplay() : this.startAutoplay();
  }

  private startAutoplay(): void {
    this.stopAutoplay();
    this.autoplayTimer = setInterval(() => {
      if (!this.paused()) this.goNext();
    }, 4500);
  }

  private stopAutoplay(): void {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  stars(rating: number): number[] {
    return Array.from({ length: rating }, (_, i) => i);
  }
}
