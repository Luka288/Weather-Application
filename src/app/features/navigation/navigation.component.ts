import { Component, computed, inject, signal } from '@angular/core';
import { tap } from 'rxjs';
import { SearchWeatherService } from '../../core/services/search-weather.service';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StateService } from '../../core/services/state.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  private readonly searchWeather = inject(SearchWeatherService);
  private readonly stateService = inject(StateService);

  displayClock = signal<string>('');
  clockLoading = signal<boolean>(false);

  isHeaderVisible = computed(() => this.stateService.headerVisible());

  searchControl = new FormControl('', { nonNullable: true });

  ngOnInit(): void {
    this.refreshClock();
  }

  refreshClock() {
    setInterval(() => {
      this.liveClock();
    }, 1000);
  }

  liveClock() {
    const date = new Date();
    this.displayClock.set(date.toLocaleTimeString());
    this.clockLoading.set(false);
  }

  search(event: Event) {
    event.preventDefault();

    const value = this.searchControl.value;
    // this.searchWeather.setSearchValue(value);

    this.stateService.searchValue.set(value);
    this.searchControl.reset();
  }
}
