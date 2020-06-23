import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toIsoFormat',
})
export class ToIsoFormatPipe implements PipeTransform {
  transform(date?: string | Date): string | undefined {
    if (!date) {
      return date;
    }

    return typeof date !== 'string'
      ? date.toISOString()
      : new Date(date).toISOString();
  }
}
