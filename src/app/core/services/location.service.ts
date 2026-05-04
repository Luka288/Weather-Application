import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { currLocationInter } from '../interfaces/currInterface';
import { catchError, EMPTY, Subject, tap } from 'rxjs';
import { currLocation } from '../consts/index';
import { StateService } from './state.service';
import { WeatherAPIService } from './weather-api.service';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private readonly weatherService = inject(WeatherAPIService);
  private readonly stateService = inject(StateService);
  private readonly http = inject(HttpClient);

  isLoading$ = new Subject<boolean>();

  constructor(@Inject(currLocation) private LOCATION_ENDPOINT: string) {}

  getCurr() {
    return this.http.get<currLocationInter>(this.LOCATION_ENDPOINT).pipe(
      tap(() => this.isLoading$.next(false)),
      catchError((e) => {
        // In case of failure of this endpoint it will automatically
        // Update state to make user write the search querry manually
        this.weatherService.searchBar.set(true);

        this.stateService.loadingScreen.set(false);

        return EMPTY;
      }),
    );
  }
}
