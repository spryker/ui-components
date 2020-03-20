import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluck',
})
export class PluckPipe implements PipeTransform {
  transform<T>(value: T, extension: keyof T): T[keyof T] | null {
    return value[extension] || null;
  }
}
