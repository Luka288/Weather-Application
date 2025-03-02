import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { API, weatherKey } from '../consts/consts';
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

  constructor(@Inject(API) private BASE_API: string) {}

  getWeather(location: string): Observable<WeatherResponse> {
    return this.http
      .get<WeatherResponse>(
        `${this.BASE_API}/${location}?unitGroup=metric&key=${this.key}&contentType=json`
      )
      .pipe(
        tap((res) => {
          this.searchBar$.next(false);
          this.searchLocation$.next(true);
          // localStorage.setItem('searchMemory', res.address);
        })
      );
  }

  coordinatesWeather(latitude: number, longitude: number) {
    // ! შემდეგი რეფაქტორი ენდპოინტი
    return this.http.get<WeatherResponse>(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude}, ${longitude}?unitGroup=metric&key=${this.key}&contentType=json`
    );
  }
}
