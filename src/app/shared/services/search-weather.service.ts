import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { sweetAlertsService } from './sweet-alerts.service';

@Injectable({
  providedIn: 'root',
})
export class SearchWeatherService {
  private searchValue = new BehaviorSubject<string>('');
  searchValue$ = this.searchValue.asObservable();

  setSearchValue(value: string) {
    this.searchValue.next(value);
  }
}
