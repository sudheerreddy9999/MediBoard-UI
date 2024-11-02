import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateDescription',
  standalone: true
})
export class TruncateDescriptionPipe implements PipeTransform {

  transform(description: string, maxLength: number = 220): string {
    if (!description) return '';
    return description.length > maxLength
      ? description.substring(0, maxLength) + '...'
      : description;
  }

}
