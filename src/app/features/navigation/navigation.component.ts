import { Component, inject } from '@angular/core';
import { tap } from 'rxjs';
import { HeaderServiceService } from '../../shared/services/header-service.service';
import { SearchWeatherService } from '../../shared/services/search-weather.service';
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
  displayClock: string = '';

  // Booleans
  isHeaderVisible: boolean = false;
  clockLoading: boolean = true;

  searchControl = new FormControl('', { nonNullable: true });

  ngOnInit(): void {
    this.refreshClock();
    this.headerService.headerVisible$
      .pipe(
        tap((res) => {
          this.isHeaderVisible = res;
        })
      )
      .subscribe();
  }

  refreshClock() {
    setInterval(() => {
      this.liveClock();
    }, 1000);
  }

  liveClock() {
    const date = new Date();
    this.displayClock = date.toLocaleTimeString();
    this.clockLoading = false;
  }

  search(event: Event) {
    event.preventDefault();

    const value = this.searchControl.value;
    this.searchWeather.setSearchValue(value);
    this.searchControl.reset();
  }
}
