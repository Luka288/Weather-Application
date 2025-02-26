import { Component, Input } from '@angular/core';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { RoundTempPipe } from '../../pipes/round-temp.pipe';
import { FormatTimePipe } from '../../pipes/format-time.pipe';
import { CommonModule } from '@angular/common';
import { hourlyRate } from '../../interfaces/weatherInterface';

@Component({
  selector: 'app-hourly-container',
  standalone: true,
  imports: [DateFormatPipe, RoundTempPipe, FormatTimePipe, CommonModule],
  templateUrl: './hourly-container.component.html',
  styleUrl: './hourly-container.component.scss',
})
export class HourlyContainerComponent {
  @Input({ alias: 'hourlyForecasts' }) foreCast!: hourlyRate[];
}
