import { ChangeDetectorRef, Component, inject } from '@angular/core';
import {
  tap,
  catchError,
  of,
  BehaviorSubject,
  EMPTY,
  ignoreElements,
} from 'rxjs';
import { WeatherAPIService } from '../../shared/services/weather-api.service';
import {
  hourlyRate,
  WeatherResponse,
} from '../../shared/interfaces/weatherInterface';
import { CommonModule, formatDate } from '@angular/common';
import { DateFormatPipe } from '../../shared/pipes/date-format.pipe';
import { SearchWeatherService } from '../../shared/services/search-weather.service';
import { RouterPreloader } from '@angular/router';
import { geoLocation } from '../../shared/interfaces/geolocation';
import { sweetAlertsService } from '../../shared/services/sweet-alerts.service';
import { HeaderServiceService } from '../../shared/services/header-service.service';
import { NgModule } from '@angular/core';
import { NgxCubeLoaderComponent } from 'ngx-cube-loader';
import { RoundTempPipe } from '../../shared/pipes/round-temp.pipe';
import { LocationService } from '../../shared/services/location.service';
import { conditions } from '../../shared/consts/dynamic.backrounds';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    DateFormatPipe,
    NgxCubeLoaderComponent,
    RoundTempPipe,
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
  private readonly cdr = inject(ChangeDetectorRef);

  // all the display properties
  displayWeather: WeatherResponse | null = null;
  foreCast: WeatherResponse[] = [];
  hourly: hourlyRate[] | null = null;
  dateFormating: number | null = null;
  day: hourlyRate | null = null;
  location: geoLocation | null = null;
  infoFromCoord: WeatherResponse | null = null;

  // booleans
  accessToLocation: boolean = false;
  searchLocation: boolean = false;
  searchBar: boolean = false;
  loading: boolean = true;
  loadingScreen: boolean = true;
  checkCurr: boolean = false;

  conditions: { [key: string]: string } = conditions;

  ngOnInit(): void {
    const memory = localStorage.getItem('searchMemory');

    if (memory) {
      this.loadWeather(memory);
    } else if (!memory) {
      this.loadCurr();
      this.searchBar = true;
    }
    this.getSearch();
    //! built in geo location (turned off)
    // if(navigator.geolocation){
    //   navigator.geolocation.getCurrentPosition((pos: geoLocation) => {
    //     this.accessToLocation = true
    //     this.location = pos
    //     this.weatherAPI.coordinatesWeather(pos.coords.latitude, pos.coords.longitude).pipe(tap(res => {
    //       this.infoFromCoord = res
    //     })).subscribe()
    //   },
    //   (error: GeolocationPositionError) => {
    //     if(error.PERMISSION_DENIED){
    //       this.accessToLocation = false
    //       this.alerts.toast('loaction denied', 'error', 'red')
    //     }
    //   }
    // )
    // }
  }

  // custom geo location API
  loadCurr() {
    this.currService
      .getCurr()
      .pipe(
        tap((res) => {
          this.loadWeather(res.city);
          this.loadingScreen = false;

          // if api could not find location (worst case)
          this.checkCurr = false;
        }),
        catchError((err) => {
          if (err.ok === false) {
            this.loadingScreen = false;
            this.checkCurr = true;
          }
          return 'Error';
        })
      )
      .subscribe();
  }

  loadWeather(location: string) {
    if (location === '') {
      this.searchLocation = false;
      this.searchBar = true;
      this.headerBoolean.isHeaderAvailable(false);
      return;
    }
    this.weatherAPI
      .getWeather(location)
      .pipe(
        tap((res) => {
          this.searchBar = false;
          this.searchLocation = true;
          this.displayWeather = res;
          this.hourly = res.days[0].hours;
          this.headerBoolean.isHeaderAvailable(true);
          localStorage.setItem('searchMemory', location);
        }),
        catchError((err) => {
          if (err.status === 400) {
            this.alerts.toast('City/Country Not Found', 'error', 'red');
          }
          return EMPTY;
        })
      )
      .subscribe();
  }

  getWeatherIcon(condition: string | undefined): string {
    return this.conditions[condition || 'Unknown'] || '';
  }

  getSearch() {
    this.searchWeather.searchValue$.subscribe((value) => {
      if (value) {
        this.loadWeather(value);
        localStorage.setItem('searchValue', value);
      }
    });
  }

  setBg() {
    let path = 'assets/videos/default.mp4';
    switch (this.displayWeather?.currentConditions?.icon) {
      case 'clear-day':
        path = 'assets/videos/clear-day.mp4';
        break;

      case 'clear-night':
        path = 'assets/videos/clear-night.mp4';
        break;

      case 'cloudy':
        path = 'assets/videos/cloudy.mp4';
        break;

      case 'fog':
        path = 'assets/videos/fog.mp4';
        break;

      case 'hail':
        path = 'assets/videos/hail-weather.mp4';
        break;

      case 'partly-cloudy-day':
        path = 'assets/videos/partly-cloudy-day.mp4';
        break;

      case 'partly-cloudy-night':
        path = 'assets/videos/partly-cloudy-night.mp4';
        break;

      case 'rain-snow-showers-day':
        path = 'assets/videos/rain-snow-showers-day.mp4';
        break;

      case 'rain-snow-showers-night':
        path = 'assets/videos/rain-snow-showers-night.mp4';
        break;

      case 'rain-snow':
        path = 'assets/videos/rainSnow.mp4';
        break;

      case 'rain':
        path = 'assets/videos/rain.mp4';
        break;

      case 'showers-day':
        path = 'assets/videos/showers-day.mp4';
        break;

      case 'showers-night':
        path = 'assets/videos/showers-night.mp4';
        break;

      case 'snow':
        path = 'assets/videos/snow.mp4';
        break;

      case 'thunder-rain':
        path = 'assets/videos/thunder-rain.mp4';
        break;

      case 'thunder-showers-day':
        path = 'assets/videos/thunder-showers-day.mp4';
        break;

      case 'thunder-showers-night':
        path = 'assets/videos/thunder-showers-night.mp4';
        break;

      case 'thunder':
        path = 'assets/videos/thunder.mp4';
        break;

      case 'wind':
        path = 'assets/videos/wind.mp4';
        break;

      default:
        path = 'default';
        break;
    }
    return path;
  }

  timeFormat(time: string) {
    let [hours, minutes] = time.split(':');

    let period = 'AM';

    let hourNum = parseInt(hours, 10);

    if (hourNum >= 12) {
      period = 'PM';
      hourNum = hourNum > 12 ? hourNum - 12 : hourNum;
    }

    if (hourNum === 0) {
      hourNum = 12;
    }

    return `${hourNum}:${minutes} ${period}`;
  }
}
