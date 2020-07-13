import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spyJoin',
})
export class JoinPipe implements PipeTransform {
  transform(value: string[], key: string): string | undefined {
    return value?.join(key);
  }
}
