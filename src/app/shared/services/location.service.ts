import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { currLocation } from '../consts/consts';
import { currLocationInter } from '../interfaces/currInterface';
import { Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private readonly http = inject(HttpClient);

  isLoading$ = new Subject<boolean>();

  constructor(@Inject(currLocation) private LOCATION_ENDPOINT: string) {}

  getCurr() {
    return this.http
      .get<currLocationInter>(`${this.LOCATION_ENDPOINT}`)
      .pipe(tap(() => this.isLoading$.next(false)));
  }
}
