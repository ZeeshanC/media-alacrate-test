import { Component, signal } from '@angular/core';
import { CtaComponent } from './components/cta/cta.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ServicesComponent } from './components/services/services.component';
import { SolutionsComponent } from './components/solutions/solutions.component';
import { StatsComponent } from './components/stats/stats.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';

@Component({
  selector: 'app-root',
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
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('media-alacarte');
}
