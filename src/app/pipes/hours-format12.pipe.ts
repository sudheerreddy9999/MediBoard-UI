import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'hoursFormat12',
  standalone: true
})
export class HoursFormat12Pipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {}

  transform(value: string): string {
    if (!value) return '';

    // Convert the string to a Date object
    const date = new Date(`1970-01-01T${value}`);
    
    // Format to hh:mm a (12-hour format with AM/PM)
    return this.datePipe.transform(date, 'hh:mm a') || ''; 
  }


}
