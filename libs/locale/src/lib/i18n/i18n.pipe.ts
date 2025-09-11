import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';

import { I18nService } from './i18n.service';
import { I18nLocaleInterpolationData } from './types';

/**
 * Use this pipe to translate locale tokens.
 *
 * It returns observable so you most likely should combine it with {@link AsyncPipe}.
 *
 * **Example:**
 * ```html
 *  <p>{{ 'some.token' | spyI18n | async }}</p>
 * ```
 *
 * **Example with data interpolation object:**
 * ```html
 *  <p>{{ 'some.token' | spyI18n:{ name: 'Hi' } | async }}</p>
 * ```
 */
@Pipe({ standalone: false, name: 'spyI18n' })
export class I18nPipe implements PipeTransform {
    constructor(private i18nService: I18nService) {}

    transform(token: string, data?: I18nLocaleInterpolationData): Observable<string> {
        return this.i18nService.translate(token, data);
    }
}
