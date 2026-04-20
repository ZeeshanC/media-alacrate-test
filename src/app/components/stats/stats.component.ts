import {
  Component,
  signal,
  AfterViewInit,
  ElementRef,
  inject,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Stat {
  value:    number;
  suffix:   string;
  label:    string;
  sublabel: string;
  icon:     string;
}

/**
 * StatsComponent
 * Animated counter section that triggers when scrolled into view.
 * Uses requestAnimationFrame for smooth number counting.
 */
@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef);
  private observer!: IntersectionObserver;

  readonly visible       = signal(false);
  readonly countersReady = signal(false);

  /** Displayed (animated) values */
  readonly displayValues = signal<number[]>([0, 0, 0]);

  readonly stats: Stat[] = [
    {
      value:    110,
      suffix:   '+',
      label:    '110+',
      sublabel: 'Top Agencies Trust Media Alacarte',
      icon: `<svg viewBox="0 0 32 32" fill="none">
        <path d="M4 28 C4 28 4 20 12 20 C20 20 20 28 20 28" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        <circle cx="12" cy="14" r="5" stroke="currentColor" stroke-width="1.8"/>
        <path d="M22 20 C26 20 28 24 28 28" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        <circle cx="22" cy="13" r="4" stroke="currentColor" stroke-width="1.8"/>
      </svg>`,
    },
    {
      value:    1,
      suffix:   'M+',
      label:    '1M+',
      sublabel: 'Advertisers Reaching the Right Audience',
      icon: `<svg viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12" stroke="currentColor" stroke-width="1.8"/>
        <path d="M16 8 V16 L22 20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="16" cy="16" r="2" fill="currentColor"/>
      </svg>`,
    },
    {
      value:    98.99,
      suffix:   '%',
      label:    '98.99%',
      sublabel: 'Seamless Media Transactions for Owners',
      icon: `<svg viewBox="0 0 32 32" fill="none">
        <path d="M6 26 L10 18 L16 22 L22 12 L26 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M24 10 L26 16 L20 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
    },
  ];

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !this.countersReady()) {
          this.visible.set(true);
          this.startCounters();
        }
      },
      { threshold: 0.3 }
    );
    this.observer.observe(this.host.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private startCounters(): void {
    const duration = 1800;
    const start    = performance.now();

    const tick = (now: number) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);

      this.displayValues.set(
        this.stats.map(s => {
          const current = s.value * eased;
          return s.value % 1 !== 0 ? parseFloat(current.toFixed(2)) : Math.floor(current);
        })
      );

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        this.countersReady.set(true);
        this.displayValues.set(this.stats.map(s => s.value));
      }
    };
    requestAnimationFrame(tick);
  }

  getDisplay(index: number): string {
    const val = this.displayValues()[index];
    const stat = this.stats[index];
    if (stat.value % 1 !== 0) {
      return val.toFixed(2) + stat.suffix;
    }
    return val + stat.suffix;
  }
}
