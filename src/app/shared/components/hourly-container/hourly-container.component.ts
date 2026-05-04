import {
  Component,
  ElementRef,
  inject,
  Input,
  signal,
  ViewChild,
} from '@angular/core';
import { DateFormatPipe } from '../../../core/pipes/date-format.pipe';
import { RoundTempPipe } from '../../../core/pipes/round-temp.pipe';
import { FormatTimePipe } from '../../../core/pipes/format-time.pipe';
import { CommonModule } from '@angular/common';
import { hourlyRate } from '../../../core/interfaces/weatherInterface';
import { BooleanService } from '../../../core/services/boolean.service';
import { ScrollToViewDirective } from '../../../core/directives/scroll-to-view.directive';

@Component({
  selector: 'app-hourly-container',
  standalone: true,
  imports: [
    DateFormatPipe,
    RoundTempPipe,
    FormatTimePipe,
    CommonModule,
    ScrollToViewDirective,
  ],
  templateUrl: './hourly-container.component.html',
  styleUrl: './hourly-container.component.scss',
})
export class HourlyContainerComponent {
  private readonly bool = inject(BooleanService);

  @Input({ alias: 'hourlyForecasts' }) foreCast!: hourlyRate[];

  constructor() {}

  get isOpen() {
    return this.bool.isOpen();
  }

  isCurrentHour(dateTime: number) {
    const date = new Date(dateTime * 1000);
    const cardHour = date.getHours();
    const currTime = new Date().getHours();
    return cardHour === currTime ? true : false;
  }
}
