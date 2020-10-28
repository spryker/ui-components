import { Pipe, PipeTransform } from '@angular/core';
import { romanize } from './number-to-roman-style-function';

@Pipe({
  name: 'numberToRomanStyle',
})
export class NumberToRomanStylePipe implements PipeTransform {
  transform(value: number): number | string {
    return romanize(value);
  }
}
