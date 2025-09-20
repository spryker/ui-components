import { Injectable, inject } from '@angular/core';
import { NzI18nInterface, NzI18nService, DateLocale } from 'ng-zorro-antd/i18n';
import { Observable, of } from 'rxjs';

import { LocaleLoaderRegistrar } from '../types';

declare module '../types' {
    interface LocaleLoaderRegistry {
        ant: AntLocaleData;
    }
}

export interface AntLocaleData {
    data: NzI18nInterface;
    dateData: DateLocale;
}

@Injectable({ providedIn: 'root' })
export class AntRegistrarService implements LocaleLoaderRegistrar<AntLocaleData> {
    private nzI18nService = inject(NzI18nService);

    private localeData: Record<string, AntLocaleData | undefined> = Object.create(null);

    registerLocale(locale: string, data: AntLocaleData): Observable<unknown> {
        this.localeData[locale] = data;
        return of(null);
    }

    changeLocale(locale: string): Observable<unknown> {
        const data = this.localeData[locale];

        if (data) {
            this.nzI18nService.setLocale(data.data);
            this.nzI18nService.setDateLocale(data.dateData);
        }

        return of(null);
    }
}
