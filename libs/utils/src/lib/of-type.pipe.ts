import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ofType' })
export class OfTypePipe implements PipeTransform {
  transform(
    value: any,
    type: string,
    trueCallback: any,
    falseCallback: any,
  ): any {
    if (typeof value === type) {
      return trueCallback;
    }

    return falseCallback;
  }
}
