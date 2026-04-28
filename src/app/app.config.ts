import {
  ApplicationConfig,
  provideZoneChangeDetection,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideZonelessChangeDetection(),
    provideRouter(routes, withViewTransitions()),
    provideAnimationsAsync(),
  ],
};
