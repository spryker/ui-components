import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'messageType' })
export class MessageTypePipe implements PipeTransform {
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
