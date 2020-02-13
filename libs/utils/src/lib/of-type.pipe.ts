import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ofType' })
export class OfTypePipe implements PipeTransform {
  transform<T, F = never>(
    value: any,
    type: string,
    trueCallback: T,
    falseCallback?: F,
  ): T | F | undefined {
    if (typeof value === type) {
      return trueCallback;
    }

    return falseCallback;
  }
}
