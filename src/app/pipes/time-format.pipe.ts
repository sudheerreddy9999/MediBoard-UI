import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'timeFormat',
  standalone: true,
})
export class TimeFormatPipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  // Function to return time based on the specified format
  transform(value: string, formatType: '24-hour' | '12-hour' = '24-hour'): string {
    if (!value) return '';

    // Handle the 12-hour format
    if (formatType === '12-hour') {
      const date = new Date(`1970-01-01T${value}`);
      return this.datePipe.transform(date, 'hh:mm a') || '';
    }

    // Default is 24-hour format
    const [hours, minutes] = value.split(':');
    return `${hours}:${minutes}`;
  }
}
