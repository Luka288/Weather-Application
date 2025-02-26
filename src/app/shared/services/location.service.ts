import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { currKey, currLocation } from '../consts/consts';
import { currLocationInter } from '../interfaces/currInterface';
import { catchError, Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private readonly http = inject(HttpClient);

  isLoading$ = new Subject<boolean>();

  getCurr() {
    return this.http.get<currLocationInter>(`${currLocation}${currKey}`).pipe(
      tap(() => this.isLoading$.next(false)),

      catchError((err) => {
        this.isLoading$.next(false);
        throw err;
      })
    );
  }
}
