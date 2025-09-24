import { registerLocaleData } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { LocaleService } from '../locale.service';
import { LocaleLoaderRegistrar } from '../types';

declare module '../types' {
    interface LocaleLoaderRegistry {
        ng: NgLocaleData;
    }
}

export interface NgLocaleData {
    data: any;
    extraData?: any;
}

@Injectable({ providedIn: 'root' })
export class NgRegistrarService implements LocaleLoaderRegistrar<NgLocaleData> {
    constructor(private localeService: LocaleService) {}

    registerLocale(locale: string, { data, extraData }: NgLocaleData): Observable<unknown> {
        const isDefault = locale === this.localeService.defaultLocale;

        registerLocaleData(data, isDefault ? undefined : locale, extraData);

        return of(null);
    }
}
