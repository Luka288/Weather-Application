import { Component, HostListener, inject, input } from '@angular/core';
import { WeatherResponse } from '../../interfaces/weatherInterface';
import { ForecastCardComponent } from '../forecast-card/forecast-card.component';
import { BooleanService } from '../../services/boolean.service';

@Component({
  selector: 'app-forecast-container',
  standalone: true,
  imports: [ForecastCardComponent],
  templateUrl: './forecast-container.component.html',
  styleUrl: './forecast-container.component.scss',
})
export class ForecastContainerComponent {
  private readonly booleanService = inject(BooleanService);

  weatherData = input<WeatherResponse | null>(null);
  isOpen = this.booleanService.isOpen;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (window.innerWidth > 1024 && this.isOpen()) {
      this.booleanService.isOpen.set(false);
    }
  }

  toggleContainer() {
    this.booleanService.toggle();
  }
}
