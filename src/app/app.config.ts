import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { errorInterceptor } from './shared/interceptors/error.interceptor';
import { API, currLocation } from './shared/consts/consts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    {
      provide: API,
      useValue: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline`,
    },

    {
      provide: currLocation,
      useValue: `https://ipinfo.io/jsodddn?token=9b0d5d3a816ac6`,
    },
    provideHttpClient(withInterceptors([errorInterceptor])),
  ],
};
