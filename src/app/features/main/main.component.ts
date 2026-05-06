import { Component, computed, inject } from '@angular/core';
import { catchError, EMPTY, filter, merge, switchMap } from 'rxjs';
import { WeatherAPIService } from '../../core/services/weather-api.service';

import { LocationService } from '../../core/services/location.service';
import { DynamicBgService } from '../../core/services/dynamic-bg.service';
import { HourlyContainerComponent } from '../../shared/components/hourly-container/hourly-container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StateService } from '../../core/services/state.service';
import { WeatherDataComponent } from '../../shared/components/weather-data/weather-data.component';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { SearchComponent } from '../../shared/components/search/search.component';
import { currLocationInter } from '../../core/interfaces/currInterface';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    HourlyContainerComponent,
    ReactiveFormsModule,
    WeatherDataComponent,
    SearchComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  private readonly weatherAPI = inject(WeatherAPIService);
  private readonly locationService = inject(LocationService);
  private readonly dynamicBg = inject(DynamicBgService);

  readonly stateService = inject(StateService);

  // To handle edge case when there is no user search value stored
  // Into localStorage searchBar computed method will toggle container
  // Which allows user to manually search its location
  searchBar = computed(() => this.weatherAPI.searchBar());

  searchLocation = computed(() => this.weatherAPI.searchLocation());

  currentBackground = computed(() => {
    const icon = this.weatherData()?.currentConditions.icon;
    return this.dynamicBg.getVideoPath(icon);
  });

  currDate = Date.now();

  readonly location = toSignal(this.locationService.getCurr());

  readonly weatherData = toSignal(
    merge(
      toObservable(this.location),
      toObservable(this.stateService.searchValue),
    ).pipe(
      filter((val): val is string | currLocationInter => !!val),

      switchMap((val) => {
        const cityQuery = typeof val === 'string' ? val : val.city;
        return this.weatherAPI.getWeather(cityQuery);
      }),

      catchError((e) => {
        console.error(e);
        return EMPTY;
      }),
    ),
    { initialValue: null },
  );
}
