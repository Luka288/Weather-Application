import { Injectable, signal } from '@angular/core';
import { signalUpdateFn } from '@angular/core/primitives/signals';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  // private isHourlyOpen = new BehaviorSubject<boolean>(false);
  // isOpen = this.isHourlyOpen.asObservable();
  isOpen = signal(false);

  loadingScreen = signal<boolean>(false);
  headerVisible = signal<boolean>(false);
  searchValue = signal<string | undefined>(undefined);

  langDropdownOpen = signal<boolean>(false);

  toggle() {
    this.isOpen.update((v) => !v);
  }
}
