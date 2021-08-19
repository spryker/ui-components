import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roman',
})
export class TransformToRomanPipe implements PipeTransform {
  transform(value: number): string {
    if (value === 0) {
      return 'NULLA';
    }
    const digits = String(+value).split('');
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
      // @ts-ignore
      roman = (key[+digits.pop() + i * 10] || '') + roman;
    }
    return Array(+digits.join('') + 1).join('M') + roman;
  }
}
