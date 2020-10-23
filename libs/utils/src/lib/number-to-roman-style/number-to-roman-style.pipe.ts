import { Pipe, PipeTransform } from '@angular/core';
import { romanize } from './number-to-roman-style-function';

@Pipe({
  name: 'numberToRomanStyle',
})
export class NumberToRomanStylePipe implements PipeTransform {
  transform(value: number, key?: string): number | string {
    if (key === 'roman') {
      return romanize(value);
    }

    return value;
  }
}
