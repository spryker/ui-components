import { Inject, Injectable, Optional } from '@angular/core';
import { escapeRegex, InjectionTokenType } from '@spryker/utils';
import { Observable, OperatorFunction, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';

import { LocaleService } from '../locale.service';
import { I18nLocaleDataToken } from './tokens';
import { I18nLocaleData, I18nLocaleInterpolationData } from './types';

@Injectable({ providedIn: 'root' })
export class I18nConfig {
    interpolationStart = '{{';
    interpolationEnd = '}}';
}

@Injectable({
    providedIn: 'root',
})
export class I18nService {
    private readonly locale$ = new ReplaySubject<I18nLocaleData>(1);

    private readonly interpolationStart = escapeRegex(this.config.interpolationStart);
    private readonly interpolationEnd = escapeRegex(this.config.interpolationEnd);

    private readonly interpolationRegex = new RegExp(
        `${this.interpolationStart}\\s*([a-z0-9_]+)\\s*${this.interpolationEnd}`,
        'ig',
    );

    constructor(
        private readonly localeService: LocaleService, // This will ensure locale load
        private readonly config: I18nConfig,
        @Optional()
        @Inject(I18nLocaleDataToken)
        defaultLocale?: InjectionTokenType<typeof I18nLocaleDataToken>,
    ) {
        if (defaultLocale) {
            this.setLocale(defaultLocale);
        }
    }

    setLocale(locale: I18nLocaleData) {
        this.locale$.next(locale);
    }

    translate(token: string, data?: I18nLocaleInterpolationData): Observable<string> {
        return this.locale$.pipe(
            map((locale) => locale[token]),
            distinctUntilChanged(),
            this.maybeInterpolateLocale(data),
            shareReplay({ bufferSize: 1, refCount: true }),
        );
    }

    private maybeInterpolateLocale(data?: I18nLocaleInterpolationData): OperatorFunction<string, string> {
        return data ? map((locale) => this.interpolate(locale, data)) : (o$) => o$;
    }

    private interpolate(localeString: string, data: I18nLocaleInterpolationData): string {
        this.interpolationRegex.lastIndex = 0; // Reset global Regex state

        return localeString.replace(this.interpolationRegex, (_, name: string) => String(data[name] ?? ''));
    }
}
