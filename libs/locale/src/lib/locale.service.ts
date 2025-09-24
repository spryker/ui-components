import { Inject, Injectable, Injector, OnDestroy, Optional, Type } from '@angular/core';
import { combineLatest, forkJoin, from, merge, Observable, of, ReplaySubject, Subject } from 'rxjs';
import {
    catchError,
    debounceTime,
    distinctUntilChanged,
    filter,
    map,
    mapTo,
    share,
    shareReplay,
    switchMap,
    takeUntil,
    tap,
} from 'rxjs/operators';

import { LocaleDefaultToken, LocaleLoaderRegistrarsToken, LocaleRecordsToken } from './tokens';
import { LocaleLoader, LocaleLoaderRegistrar, LocaleRecord } from './types';

type UnknownLocaleLoaderMap = Record<string, LocaleLoader<unknown> | undefined>;
type UnknownLocaleLoaderRegistrarMap = Record<string, Type<LocaleLoaderRegistrar<unknown>> | undefined>;

@Injectable({ providedIn: 'root' })
export class LocaleService implements OnDestroy {
    private locales: LocaleRecord[] = this.localeRecords?.flat() ?? [];

    locale?: string;
    supportedLocales = this.locales.map((locale) => locale.id);

    private knownLocales = this.locales.reduce<Record<string, boolean | undefined>>(
        (acc, locale) => ({ ...acc, [locale.id]: true }),
        Object.create(null),
    );

    private loaderRegistrars: UnknownLocaleLoaderRegistrarMap =
        this.loaderRegistrarsArr?.reduce(
            (acc, loaderRegistrars) => ({ ...acc, ...loaderRegistrars }),
            Object.create(null),
        ) ?? {};

    private loaders = this.locales
        .filter((locale) => !!locale.loaders)
        .reduce<Record<string, UnknownLocaleLoaderMap | undefined>>(
            (acc, locale) => ({
                ...acc,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                [locale.id]: this.pickRegisteredLoaders(locale.loaders!),
            }),
            Object.create(null),
        );

    private destroyed$ = new Subject<void>();
    private setLocale$ = new ReplaySubject<string>(1);

    locale$ = this.setLocale$.pipe(distinctUntilChanged());

    private localeLoad$ = this.locale$.pipe(
        switchMap((locale) => this.loadLocale(locale).pipe(catchError(() => of(locale)))),
        share(),
    );

    localeLoading$ = merge(this.locale$.pipe(mapTo(true)), this.localeLoad$.pipe(mapTo(false))).pipe(
        shareReplay({ bufferSize: 1, refCount: false }),
    );

    localeLoaded$ = combineLatest([this.localeLoading$, this.locale$]).pipe(
        debounceTime(0),
        filter(([isLoaded]) => !isLoaded),
        map(([_, locale]) => locale),
        shareReplay({ bufferSize: 1, refCount: false }),
    );

    constructor(
        @Optional()
        @Inject(LocaleDefaultToken)
        public defaultLocale: string | null,
        @Optional()
        @Inject(LocaleRecordsToken)
        private localeRecords: LocaleRecord[][] | null,
        @Optional()
        @Inject(LocaleLoaderRegistrarsToken)
        private loaderRegistrarsArr: UnknownLocaleLoaderRegistrarMap[] | null,
        private injector: Injector,
    ) {
        if (!this.defaultLocale) {
            this.defaultLocale =
                this.locales.length === 1
                    ? this.locales[0].id
                    : (this.locales.find((locale) => locale.default)?.id ?? null);
        }

        if (this.defaultLocale) {
            this.setLocale(this.defaultLocale);
        }

        this.localeLoaded$.pipe(takeUntil(this.destroyed$)).subscribe();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
    }

    setLocale(locale: string) {
        if (locale in this.knownLocales === false) {
            throw new Error(`LocaleService: Cannot switch to unknown locale ${locale}`);
        }

        this.setLocale$.next(locale);

        return this.localeLoaded$;
    }

    private loadLocale(locale: string) {
        return this.invokeLoaders(locale, this.loaders[locale] || {}).pipe(
            tap(() => {
                delete this.loaders[locale];
                this.locale = locale;
            }),
            mapTo(locale),
        );
    }

    private invokeLoaders(locale: string, loaders: UnknownLocaleLoaderMap): Observable<unknown> {
        const loadersMap = Object.entries(this.loaderRegistrars).map(([name, registrarType]) => ({
            // Iterating over existing values
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            registrarType: registrarType!,
            loader: loaders[name],
        }));

        const registerLocaleIn = (registrarType: Type<LocaleLoaderRegistrar<unknown>>, data: unknown) =>
            this.injector.get(registrarType).registerLocale(locale, data);

        const changeLocaleIn = (registrarType: Type<LocaleLoaderRegistrar<unknown>>) => {
            const registrar = this.injector.get(registrarType);
            return registrar.changeLocale ? registrar.changeLocale(locale) : of(null);
        };

        const loaderStreams = loadersMap.map(({ loader, registrarType }) =>
            loader
                ? from(loader()).pipe(
                      switchMap((data) =>
                          registerLocaleIn(registrarType, data).pipe(switchMap(() => changeLocaleIn(registrarType))),
                      ),
                  )
                : changeLocaleIn(registrarType),
        );

        return forkJoin(loaderStreams);
    }

    private pickRegisteredLoaders(loaders: UnknownLocaleLoaderMap): UnknownLocaleLoaderMap {
        return Object.fromEntries(Object.entries(loaders).filter(([name]) => name in this.loaderRegistrars));
    }
}
