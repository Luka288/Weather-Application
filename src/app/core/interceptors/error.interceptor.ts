import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { sweetAlertsService } from '../services/sweet-alerts.service';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const alerts = inject(sweetAlertsService);

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

      console.log(err);

      alerts.toast(message, 'error', '');
      return throwError(() => new Error('Error occurred'));
    }),
  );
};
