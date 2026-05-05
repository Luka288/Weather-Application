import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { sweetAlertsService } from '../services/sweet-alerts.service';
import { catchError, throwError, EMPTY } from 'rxjs';
import { StateService } from '../services/state.service';
import { WeatherAPIService } from '../services/weather-api.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const alerts = inject(sweetAlertsService);
  const stateService = inject(StateService);
  const weatherService = inject(WeatherAPIService);

  if (req.url.startsWith('/assets') || req.url.startsWith('assets/')) {
    return next(req);
  }

  let message = 'Error';

  const possibleErrors: { [key: number]: string } = {
    400: 'City or country not found!',
    404: 'Your location not found',
    401: 'Server error.',
    500: 'Server is down!',
  };

  return next(req).pipe(
    catchError((err) => {
      message = possibleErrors[err.status] || 'Unknown error';

      // Handles edge case when the ipinfo fails toggles search
      // Component to allow user to search city/country
      if (req.url.startsWith('https://ipinfo.io')) {
        stateService.loadingScreen.set(false);
        weatherService.searchBar.set(true);
        return EMPTY;
      }

      console.error(err);

      alerts.toast(message, 'error', '');
      return EMPTY;
    }),
  );
};
