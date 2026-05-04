import { Component, inject, signal } from '@angular/core';
import { tap } from 'rxjs';
import { HeaderServiceService } from '../../core/services/header-service.service';
import { SearchWeatherService } from '../../core/services/search-weather.service';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  private readonly searchWeather = inject(SearchWeatherService);
  private readonly headerService = inject(HeaderServiceService);

  // variables
  displayClock = signal<string>('');

  // Booleans
  isHeaderVisible = signal<boolean>(false);
  clockLoading = signal<boolean>(false);

  searchControl = new FormControl('', { nonNullable: true });

  ngOnInit(): void {
    this.refreshClock();
    this.headerService.headerVisible$.subscribe((res) =>
      this.isHeaderVisible.set(res),
    );
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
    this.searchWeather.setSearchValue(value);
    this.searchControl.reset();
  }
}
