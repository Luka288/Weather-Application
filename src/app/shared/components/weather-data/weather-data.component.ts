import { Component, input } from '@angular/core';
import { conditions } from '../../../core/consts';
import { Condition } from '../../../core/interfaces/base.types';
import { WeatherResponse } from '../../../core/interfaces/weatherInterface';
import { RoundTempPipe } from '../../../core/pipes/round-temp.pipe';
import { ForecastContainerComponent } from '../forecast-container/forecast-container.component';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-weather-data',
  standalone: true,
  imports: [RoundTempPipe, ForecastContainerComponent, TranslocoPipe],
  templateUrl: './weather-data.component.html',
  styleUrl: './weather-data.component.scss',
})
export class WeatherDataComponent {
  weatherData = input<WeatherResponse | null>(null);

  getWeatherIcon(condition: Condition): string {
    return conditions[condition || 'Unknown'] || '';
  }
}
