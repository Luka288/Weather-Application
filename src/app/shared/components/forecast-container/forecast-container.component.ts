import { Component, HostListener, inject, input } from '@angular/core';
import { WeatherResponse } from '../../../core/interfaces/weatherInterface';
import { ForecastCardComponent } from '../forecast-card/forecast-card.component';
import { StateService } from '../../../core/services/state.service';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-forecast-container',
  standalone: true,
  imports: [ForecastCardComponent, TranslocoModule],
  templateUrl: './forecast-container.component.html',
  styleUrl: './forecast-container.component.scss',
})
export class ForecastContainerComponent {
  private readonly stateService = inject(StateService);

  weatherData = input<WeatherResponse | null>(null);
  isOpen = this.stateService.isOpen;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (window.innerWidth > 1024 && this.isOpen()) {
      this.stateService.isOpen.set(false);
    }
  }

  toggleContainer() {
    this.stateService.toggle();
  }
}
