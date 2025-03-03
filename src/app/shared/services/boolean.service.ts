import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooleanService {
  private isHourlyOpen = new BehaviorSubject<boolean>(false);
  isOpen = this.isHourlyOpen.asObservable();

  toggle() {
    this.isHourlyOpen.next(!this.isHourlyOpen.value);
  }
}
