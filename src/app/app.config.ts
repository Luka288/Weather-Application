import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { API, currLocation } from './core/consts/consts';
import { APIrequestInterceptor } from './core/interceptors/api.request.interceptor';

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
      useValue: `https://ipinfo.io/json?token=9b0asdasdsd5d3a816ac6`,
    },
    provideHttpClient(
      withInterceptors([errorInterceptor, APIrequestInterceptor]),
    ),
  ],
};
