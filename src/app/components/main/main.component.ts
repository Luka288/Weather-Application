import { Component, inject, signal } from '@angular/core';
import { tap } from 'rxjs';
import { WeatherAPIService } from '../../shared/services/weather-api.service';
import {
  hourlyRate,
  WeatherResponse,
} from '../../shared/interfaces/weatherInterface';
import { CommonModule } from '@angular/common';
import { DateFormatPipe } from '../../shared/pipes/date-format.pipe';
import { SearchWeatherService } from '../../shared/services/search-weather.service';
import { sweetAlertsService } from '../../shared/services/sweet-alerts.service';
import { HeaderServiceService } from '../../shared/services/header-service.service';
import { NgxCubeLoaderComponent } from 'ngx-cube-loader';
import { RoundTempPipe } from '../../shared/pipes/round-temp.pipe';
import { LocationService } from '../../shared/services/location.service';
import { conditions } from '../../shared/consts/dynamic.backrounds';
import { DynamicBgService } from '../../shared/services/dynamic-bg.service';
import { FormatTimePipe } from '../../shared/pipes/format-time.pipe';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    DateFormatPipe,
    NgxCubeLoaderComponent,
    RoundTempPipe,
    FormatTimePipe,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export default class MainComponent {
  private readonly weatherAPI = inject(WeatherAPIService);
  private readonly searchWeather = inject(SearchWeatherService);
  private readonly alerts = inject(sweetAlertsService);
  private readonly headerBoolean = inject(HeaderServiceService);
  private readonly currService = inject(LocationService);
  private readonly dynamicBg = inject(DynamicBgService);

  displayWeather = signal<WeatherResponse | null>(null);
  hourly = signal<hourlyRate[]>([]);

  searchLocation: boolean = false;
  searchBar: boolean = false;
  userLocationSearch: boolean = false;
  loadingScreen: boolean = true;

  conditions: { [key: string]: string } = conditions;

  ngOnInit(): void {
    this.initWeather();
    this.getSearch();
    this.updatingBooleans();
  }

  initWeather() {
    const memory = localStorage.getItem('searchMemory');

    if (memory) {
      this.loadWeather(memory);
    } else if (!memory) {
      this.loadCurr();
      this.loadingScreen = true;
      this.searchBar = true;
    }
  }

  updatingBooleans(): void {
    this.weatherAPI.searchBar$
      .pipe(
        tap((res) => {
          this.searchBar = res;
        })
      )
      .subscribe();

    this.weatherAPI.searchLocation$
      .pipe(
        tap((res) => {
          this.searchLocation = res;
        })
      )
      .subscribe();

    this.currService.isLoading$
      .pipe(
        tap((isLoading) => {
          this.loadingScreen = isLoading;
        })
      )
      .subscribe();
  }

  loadCurr() {
    this.currService.getCurr().subscribe((res) => {
      if (res) {
        this.loadWeather(res.city);
        this.loadingScreen = false;
      } else {
        this.userLocationSearch = true;
        this.searchBar = true;
        this.loadingScreen = false;
      }
    });
  }

  loadWeather(location: string) {
    if (location === '') {
      this.searchLocation = false;
      this.searchBar = true;
      this.loadingScreen = false;
      this.headerBoolean.isHeaderAvailable(false);
      return;
    }
    // return throwError(() => error);
    this.weatherAPI.getWeather(location).subscribe({
      next: (res) => {
        this.hourly.set(res.days[0].hours);
        this.displayWeather.set(res);
        this.headerBoolean.isHeaderAvailable(true);
      },
      error: () => {
        this.alerts.toast('City/Country Not Found', 'error', '');
      },
    });
  }

  getWeatherIcon(condition: string | undefined): string {
    return this.conditions[condition || 'Unknown'] || '';
  }

  getSearch() {
    this.searchWeather.searchValue$.subscribe((value) => {
      if (value) {
        this.loadWeather(value);
        // localStorage.setItem('searchValue', value);
      }
    });
  }

  setBg() {
    return this.dynamicBg.getVideoPath(
      this.displayWeather()?.currentConditions.icon
    );
  }
}
