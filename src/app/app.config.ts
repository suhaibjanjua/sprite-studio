import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideServiceWorker } from '@angular/service-worker';
import { iconsReducer } from './features/sprite-studio/store/icons.reducer';
import { viewModeReducer } from './features/sprite-studio/store/view-mode.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({
      icons: iconsReducer,
      viewMode: viewModeReducer
    }),
    provideEffects(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          })
]
};
