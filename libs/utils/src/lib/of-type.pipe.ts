import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ofType' })
export class OfTypePipe implements PipeTransform {
  transform<T = boolean, F = boolean>(
    value: any,
    type: string,
    trueCallback: T = true as any,
    falseCallback: F = false as any,
  ): T | F | undefined {
    if (typeof value === type) {
      return trueCallback;
    }

    return falseCallback;
  }
}
