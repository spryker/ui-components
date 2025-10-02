import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';

import { I18nService } from '../i18n/i18n.service';
import { I18nLocaleData } from '../i18n/types';
import { LocaleLoaderRegistrar } from '../types';

declare module '../types' {
    interface LocaleLoaderRegistry {
        spryker: SprykerLocaleData;
    }
}

export interface SprykerLocaleData {
    data: I18nLocaleData;
}

@Injectable({
    providedIn: 'root',
})
export class SprykerRegistrarService implements LocaleLoaderRegistrar<SprykerLocaleData> {
    protected i18nService = inject(I18nService);

    private localeData: Record<string, SprykerLocaleData | undefined> = Object.create(null);

    registerLocale(locale: string, data: SprykerLocaleData): Observable<unknown> {
        this.localeData[locale] = data;
        return of(null);
    }

    changeLocale(locale: string): Observable<unknown> {
        const data = this.localeData[locale];

        if (data) {
            this.i18nService.setLocale(data.data);
        }

        return of(null);
    }
}
