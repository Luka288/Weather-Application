import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime',
  standalone: true,
})
export class FormatTimePipe implements PipeTransform {
  // გადაყავს დრო (01:00:00) AM/PM ფორმატში
  transform(value: string): string {
    let [hours, minutes] = value.split(':');

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
