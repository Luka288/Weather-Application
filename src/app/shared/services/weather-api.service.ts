import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { weatherKey } from '../consts/consts';
import { WeatherResponse } from '../interfaces/weatherInterface';
import { catchError, EMPTY, Observable, Subject, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherAPIService {
  private readonly http = inject(HttpClient);
  protected readonly key = weatherKey;

  searchBar$ = new Subject<boolean>();
  searchLocation$ = new Subject<boolean>();

  getWeather(location: string): Observable<WeatherResponse> {
    return this.http
      .get<WeatherResponse>(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${this.key}&contentType=json`
      )
      .pipe(
        tap((res) => {
          this.searchBar$.next(false);
          this.searchLocation$.next(true);
          // localStorage.setItem('searchMemory', res.address);
        }),
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  coordinatesWeather(latitude: number, longitude: number) {
    return this.http.get<WeatherResponse>(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude}, ${longitude}?unitGroup=metric&key=${this.key}&contentType=json`
    );
  }
}
