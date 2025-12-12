import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ standalone: false, name: 'pluck' })
export class PluckPipe implements PipeTransform {
    transform<T>(value: T, key: keyof T): T[keyof T] | undefined {
        return value?.[key];
    }
}
