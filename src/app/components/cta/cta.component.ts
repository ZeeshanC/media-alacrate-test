import {
  Component,
  signal,
  AfterViewInit,
  ElementRef,
  inject,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * CtaComponent
 * Full-width call-to-action section with animated background
 * and a demo request form (controlled with Angular signals).
 */
@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cta.component.html',
  styleUrls: ['./cta.component.scss'],
})
export class CtaComponent implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef);
  private observer!: IntersectionObserver;

  readonly visible    = signal(false);
  readonly submitted  = signal(false);
  readonly email      = signal('');
  readonly emailError = signal('');

  readonly features: string[] = [
    'Plan, Book & Manage Campaigns',
    'Maximise Reach and ROI',
    'AI-Powered Automation',
    '100% Efficiency Guarantee',
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

  onEmailInput(event: Event): void {
    this.email.set((event.target as HTMLInputElement).value);
    this.emailError.set('');
  }

  requestDemo(): void {
    const val = this.email().trim();
    if (!val) {
      this.emailError.set('Please enter your email address.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) {
      this.emailError.set('Please enter a valid email address.');
      return;
    }
    // Simulate submission
    this.submitted.set(true);
  }

  resetForm(): void {
    this.submitted.set(false);
    this.email.set('');
  }
}
