import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toIsoFormat',
})
export class ToIsoFormat implements PipeTransform {
  transform(date: string | Date): string {
    return typeof date !== 'string'
      ? date.toISOString()
      : new Date(date).toISOString();
  }
}
