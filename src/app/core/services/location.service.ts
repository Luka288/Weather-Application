import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { currLocationInter } from '../interfaces/currInterface';
import { Subject, tap } from 'rxjs';
import { currLocation } from '../consts/index';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private readonly http = inject(HttpClient);

  isLoading$ = new Subject<boolean>();

  constructor(@Inject(currLocation) private LOCATION_ENDPOINT: string) {}

  // SKIPPING API INTERCEPTOR IN THIS CASE.
  getCurr() {
    return this.http
      .get<currLocationInter>(this.LOCATION_ENDPOINT)
      .pipe(tap(() => this.isLoading$.next(false)));
  }
}
