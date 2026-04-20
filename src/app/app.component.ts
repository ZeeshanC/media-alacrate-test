import { Component } from '@angular/core';
import { NavbarComponent }     from './components/navbar/navbar.component';
import { HeroComponent }       from './components/hero/hero.component';
import { ServicesComponent }   from './components/services/services.component';
import { SolutionsComponent }  from './components/solutions/solutions.component';
import { StatsComponent }      from './components/stats/stats.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { CtaComponent }        from './components/cta/cta.component';
import { FooterComponent }     from './components/footer/footer.component';

/**
 * AppComponent — Root shell that composes all page sections.
 * Each section is a standalone component for tree-shaking and lazy loading support.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    ServicesComponent,
    SolutionsComponent,
    StatsComponent,
    TestimonialsComponent,
    CtaComponent,
    FooterComponent,
  ],
  template: `
    <app-navbar />
    <main>
      <app-hero />
      <app-services />
      <app-solutions />
      <app-stats />
      <app-testimonials />
      <app-cta />
    </main>
    <app-footer />
  `,
  styles: [`
    main { display: block; }
  `]
})
export class AppComponent {}
