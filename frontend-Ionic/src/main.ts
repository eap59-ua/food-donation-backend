import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { PreloadAllModules, RouteReuseStrategy, provideRouter, withPreloading } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
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
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
    importProvidersFrom(IonicModule.forRoot({ mode: 'ios' }))
  ]
}).catch(err => console.error(err));
