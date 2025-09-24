import { Pipe, PipeTransform } from '@angular/core';
import { toIsoDateFormat } from './to-iso-date-format-function';

@Pipe({
    name: 'spyToIsoDateFormat',
})
export class ToIsoDateFormatPipe implements PipeTransform {
    transform(date?: string | Date): string {
        if (!date) {
            return '';
        }

        return toIsoDateFormat(date);
    }
}
