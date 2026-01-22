import { HttpClient, HttpContext } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { API, weatherKey } from '../consts/consts';
import { WeatherResponse } from '../interfaces/weatherInterface';
import { catchError, EMPTY, Observable, Subject, tap, throwError } from 'rxjs';
import { API_BASE } from '../consts/http.context';

@Injectable({
  providedIn: 'root',
})
export class WeatherAPIService {
  private readonly http = inject(HttpClient);
  protected readonly key = weatherKey;

  searchBar$ = new Subject<boolean>();
  searchLocation$ = new Subject<boolean>();

  constructor(@Inject(API) private BASE_API: string) {}

  getWeather(location: string): Observable<WeatherResponse> {
    const ctx = new HttpContext().set(API_BASE, 'weather');

    // encodeURIComponent() used to convert user input "location" to valid
    // URL format because of commas, spaces, special chars
    return this.http
      .get<WeatherResponse>(encodeURIComponent(location), {
        context: ctx,
        params: {
          unitGroup: 'metric',
          key: this.key,
          contentType: 'json',
        },
      })
      .pipe(
        tap(() => {
          this.searchBar$.next(false);
          this.searchLocation$.next(true);
        }),
      );
  }

  coordinatesWeather(latitude: number, longitude: number) {
    const ctx = new HttpContext().set(API_BASE, 'ipinfo');

    console.log(ctx);

    return this.http.get<WeatherResponse>(
      `${latitude},${longitude}?unitGroup=metric&key=${this.key}&contentType=json`,
      { context: ctx },
    );
  }
}
