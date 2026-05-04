import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooleanService {
  // private isHourlyOpen = new BehaviorSubject<boolean>(false);
  // isOpen = this.isHourlyOpen.asObservable();
  isOpen = signal(false);

  toggle() {
    this.isOpen.update((v) => !v);
  }
}
