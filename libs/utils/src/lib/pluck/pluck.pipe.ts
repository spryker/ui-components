import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluck',
})
export class PluckPipe implements PipeTransform {
  transform<T>(value: T, extension: keyof T): T[keyof T] | undefined {
    return value?.[extension];
  }
}
