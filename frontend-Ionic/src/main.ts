import { enableProdMode, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { PreloadAllModules, RouteReuseStrategy, provideRouter, withPreloading } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  leafOutline, heartOutline, giftOutline, gridOutline, personOutline, logOutOutline,
  searchOutline, restaurantOutline, peopleOutline, trendingUpOutline, cubeOutline,
  shieldCheckmarkOutline, checkmarkCircleOutline, closeCircleOutline, timeOutline,
  mailOutline, lockClosedOutline, businessOutline, locationOutline, calendarOutline,
  createOutline, arrowForwardOutline, checkmarkOutline, helpCircleOutline, bagHandleOutline,
  documentTextOutline, refreshOutline
} from 'ionicons/icons';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

addIcons({
  leafOutline, heartOutline, giftOutline, gridOutline, personOutline, logOutOutline,
  searchOutline, restaurantOutline, peopleOutline, trendingUpOutline, cubeOutline,
  shieldCheckmarkOutline, checkmarkCircleOutline, closeCircleOutline, timeOutline,
  mailOutline, lockClosedOutline, businessOutline, locationOutline, calendarOutline,
  createOutline, arrowForwardOutline, checkmarkOutline, helpCircleOutline, bagHandleOutline,
  documentTextOutline, refreshOutline
});

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular({ mode: 'ios' }),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient()
  ]
}).catch(err => console.error(err));
