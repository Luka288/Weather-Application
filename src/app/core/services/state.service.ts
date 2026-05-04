import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  // private isHourlyOpen = new BehaviorSubject<boolean>(false);
  // isOpen = this.isHourlyOpen.asObservable();
  isOpen = signal(false);

  loadingScreen = signal<boolean>(false);

  toggle() {
    this.isOpen.update((v) => !v);
  }
}
