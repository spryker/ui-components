import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ standalone: false, name: 'spyJoin' })
export class JoinPipe implements PipeTransform {
    transform(value?: string[], key?: string): string {
        return value?.join(key) || '';
    }
}
