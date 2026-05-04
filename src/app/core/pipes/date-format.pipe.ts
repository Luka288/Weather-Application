import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true,
})
export class DateFormatPipe implements PipeTransform {
  transform(value: number): string {
    const date = new Date(Number(value) * 1000);
    const format = date.toDateString();

    return format;
  }
}
