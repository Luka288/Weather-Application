import { Component, Input } from '@angular/core';
import { daysInterf, WeatherResponse } from '../../interfaces/weatherInterface';
import { conditions } from '../../consts/dynamic.backrounds';

@Component({
  selector: 'app-forecast-card',
  standalone: true,
  imports: [],
  templateUrl: './forecast-card.component.html',
  styleUrl: './forecast-card.component.scss',
})
export class ForecastCardComponent {
  @Input({ alias: 'forecastCard' }) forecast!: daysInterf;
  @Input({ alias: 'location' }) locationCode!: WeatherResponse;

  getWeatherIcon(condition: string): string {
    return conditions[condition || 'Unknown'] || '';
  }
}
