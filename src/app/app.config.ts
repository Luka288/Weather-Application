import { ApplicationConfig, isDevMode } from '@angular/core';
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
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@jsverse/transloco';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: API,
      useValue: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline`,
    },

    {
      provide: currLocation,
      useValue: `https://ipinfo.io/json?token=9b0d5d3a816ac6`,
    },
    provideHttpClient(
      withFetch(),
      withInterceptors([errorInterceptor, APIrequestInterceptor]),
    ),
    provideTransloco({
      config: {
        availableLangs: ['en', 'ka'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
  ],
};
