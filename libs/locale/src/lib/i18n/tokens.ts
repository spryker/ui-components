import { InjectionToken, Provider } from '@angular/core';

import { I18nLocaleData } from './types';

export const I18nLocaleDataToken = new InjectionToken<I18nLocaleData>('I18nLocaleData');

export function provideI18nLocaleData(data: I18nLocaleData): Provider {
    return {
        provide: I18nLocaleDataToken,
        useValue: data,
    };
}
