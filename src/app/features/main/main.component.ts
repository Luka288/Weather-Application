import { Component, computed, effect, inject, signal } from '@angular/core';
import { catchError, EMPTY, filter, switchMap, tap } from 'rxjs';
import { WeatherAPIService } from '../../core/services/weather-api.service';
import {
  hourlyRate,
  WeatherResponse,
} from '../../core/interfaces/weatherInterface';
import { CommonModule } from '@angular/common';
import { SearchWeatherService } from '../../core/services/search-weather.service';
import { HeaderServiceService } from '../../core/services/header-service.service';
import { NgxCubeLoaderComponent } from 'ngx-cube-loader';
import { RoundTempPipe } from '../../core/pipes/round-temp.pipe';
import { LocationService } from '../../core/services/location.service';
import { conditions } from '../../core/consts/dynamic.backrounds';
import { DynamicBgService } from '../../core/services/dynamic-bg.service';
import { HourlyContainerComponent } from '../../shared/components/hourly-container/hourly-container.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ForecastCardComponent } from '../../shared/components/forecast-card/forecast-card.component';
import { StateService } from '../../core/services/state.service';
import { TrackWidthDirective } from '../../core/directives/track-width.directive';
import { DateFormatPipe } from '../../core/pipes/date-format.pipe';
import { WeatherDataComponent } from '../../shared/components/weather-data/weather-data.component';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { currLocationInter } from '../../core/interfaces/currInterface';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    NgxCubeLoaderComponent,
    HourlyContainerComponent,
    ReactiveFormsModule,
    WeatherDataComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export default class MainComponent {
  private readonly weatherAPI = inject(WeatherAPIService);
  private readonly searchWeather = inject(SearchWeatherService);
  private readonly currService = inject(LocationService);
  private readonly dynamicBg = inject(DynamicBgService);

  private readonly headerBoolean = inject(HeaderServiceService);
  readonly stateService = inject(StateService);

  // displayWeather = signal<WeatherResponse | null>(null);
  // hourly = signal<hourlyRate[]>([]);

  searchLocation = computed(() => this.weatherAPI.searchLocation());

  // To handle edge case when there is no user search value stored
  // Into localStorage searchBar computed method will toggle container
  // Which allows user to manually search its location
  searchBar = computed(() => this.weatherAPI.searchBar());

  locationSearch = new FormControl('', { nonNullable: true });

  currDate = Date.now();

  readonly location = toSignal(this.currService.getCurr());

  readonly weatherData = toSignal(
    toObservable(this.stateService.searchValue).pipe(
      filter((city): city is string => !!city),
      switchMap((city) => this.weatherAPI.getWeather(city)),
      catchError((e) => {
        console.error(e);
        return EMPTY;
      }),
    ),
    { initialValue: null },
  );

  ngOnInit(): void {
    this.location();

    // this.getSearch();
    // this.initWeather();
    // this.updatingBooleans();
  }

  initWeather() {
    const memory = localStorage.getItem('searchMemory');

    // In case of there is user search query stored in localStorage
    // Weather is loading from server, but in other case there is
    // Container to make user to search location manually
    if (memory) {
      this.loadWeather(memory);
    } else if (!memory) {
      this.loadCurr();
      // this.loadingScreen.set(true);
      // this.searchBar.set(true);
    }
  }

  updatingBooleans(): void {
    this.weatherAPI.searchBar();

    this.weatherAPI.searchLocation();
  }

  loadCurr() {
    this.currService.getCurr().subscribe({
      next: (res) => {
        this.loadWeather(res.city);
        // this.loadingScreen.set(false);
      },
      error: () => {
        // this.searchBar.set(true);
        // this.userLocationSearch.set(true);
        // this.loadingScreen.set(false);
      },
    });
  }

  loadWeather(location: string) {
    if (!location) {
      // this.searchLocation.set(false);
      // this.searchBar.set(true);
      // this.loadingScreen.set(false);
      // this.headerBoolean.isHeaderAvailable(false);
      return;
    }

    this.weatherAPI.getWeather(location).subscribe({
      next: (res) => {
        // this.hourly.set(res.days[0].hours);
        // this.displayWeather.set(res);
        // this.headerBoolean.isHeaderAvailable(true);
      },
    });
  }

  getSearch() {
    // this.searchWeather.searchValue$.subscribe((value) => {
    //   if (value) {
    //     this.activeLocation.set(value);
    //   }
    // });
  }

  setBg() {
    return this.dynamicBg.getVideoPath(
      this.weatherData()?.currentConditions.icon,
    );
  }

  submitUserSearch(event: Event) {
    event.preventDefault();
    const value = this.locationSearch.value;

    this.stateService.searchValue.set(value);
  }
}
