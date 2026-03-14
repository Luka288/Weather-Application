import {
  Component,
  ElementRef,
  inject,
  Input,
  signal,
  ViewChild,
} from '@angular/core';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { RoundTempPipe } from '../../pipes/round-temp.pipe';
import { FormatTimePipe } from '../../pipes/format-time.pipe';
import { CommonModule } from '@angular/common';
import { hourlyRate } from '../../interfaces/weatherInterface';
import { BooleanService } from '../../services/boolean.service';
import { ScrollToViewDirective } from '../../directives/scroll-to-view.directive';

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

  isOpen = signal<boolean>(false);

  constructor() {}

  ngOnInit(): void {
    this.toggle();
  }

  toggle() {
    this.bool.isOpen.subscribe((res) => {
      this.isOpen.set(res);
    });
  }

  isCurrentHour(dateTime: number) {
    const date = new Date(dateTime * 1000);
    const cardHour = date.getHours();
    const currTime = new Date().getHours();
    return cardHour === currTime ? true : false;
  }
}
