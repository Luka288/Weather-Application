import { Component, input } from '@angular/core';
import { conditions } from '../../consts';
import { Condition } from '../../interfaces/base.types';
import { WeatherResponse } from '../../interfaces/weatherInterface';
import { RoundTempPipe } from '../../pipes/round-temp.pipe';
import { ForecastContainerComponent } from '../forecast-container/forecast-container.component';

@Component({
  selector: 'app-weather-data',
  standalone: true,
  imports: [RoundTempPipe, ForecastContainerComponent],
  templateUrl: './weather-data.component.html',
  styleUrl: './weather-data.component.scss',
})
export class WeatherDataComponent {
  weatherData = input<WeatherResponse | null>(null);

  getWeatherIcon(condition: Condition): string {
    return conditions[condition || 'Unknown'] || '';
  }
}
