import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spyRoman',
})
export class RomanPipe implements PipeTransform {
  transform(value: number): string {
    if (isNaN(value)) {
      return 'NaN';
    }
    const digits = String(value).split('');
    const key = [
      '',
      'C',
      'CC',
      'CCC',
      'CD',
      'D',
      'DC',
      'DCC',
      'DCCC',
      'CM',
      '',
      'X',
      'XX',
      'XXX',
      'XL',
      'L',
      'LX',
      'LXX',
      'LXXX',
      'XC',
      '',
      'I',
      'II',
      'III',
      'IV',
      'V',
      'VI',
      'VII',
      'VIII',
      'IX',
    ];
    let roman = '';
    let i = 3;
    while (i--) {
      const nextDigit = digits.pop();
      if (nextDigit) {
        roman = (key[+nextDigit + i * 10] || '') + roman;
      }
    }
    return Array(+digits.join('') + 1).join('M') + roman;
  }
}
