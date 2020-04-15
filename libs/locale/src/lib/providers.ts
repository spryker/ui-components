import { LOCALE_ID, Provider } from '@angular/core';
import {
  AnyFunction,
  FunctionWithArgs,
  FunctionWithoutArgs,
} from '@spryker/utils';

import { LocaleService } from './locale.service';
import {
  LocaleDefaultToken,
  LocaleLoaderRegistrarsToken,
  LocaleRecordsToken,
} from './tokens';
import { LocaleLoaderRegistrarMap, LocaleRecord } from './types';

export function provideLocaleId(): Provider {
  return {
    provide: LOCALE_ID,
    useFactory: localeIdFactory,
    deps: [LocaleService],
  };
}

export function provideLocaleRecords(locales: LocaleRecord[]): Provider {
  return {
    provide: LocaleRecordsToken,
    useValue: locales,
    multi: true,
  };
}

export function provideLocaleRecordsFactory<
  F extends FunctionWithArgs<LocaleRecord[]>
>(factory: F, deps: Parameters<F>): Provider;
export function provideLocaleRecordsFactory<
  F extends FunctionWithoutArgs<LocaleRecord[]>
>(factory: F): Provider;
export function provideLocaleRecordsFactory(
  factory: AnyFunction<LocaleRecord[]>,
  deps?: any[],
): Provider {
  return {
    provide: LocaleRecordsToken,
    useFactory: factory,
    deps,
    multi: true,
  };
}

export function provideDefaultLocale(locale: string): Provider {
  return {
    provide: LocaleDefaultToken,
    useValue: locale,
  };
}

export function provideLocaleLoaderRegistrars(
  registrars: Partial<LocaleLoaderRegistrarMap>,
): Provider {
  return {
    provide: LocaleLoaderRegistrarsToken,
    useValue: registrars,
    multi: true,
  };
}

export function localeIdFactory(localeService: LocaleService): string {
  class LocaleId extends String {
    toString() {
      return localeService.locale || '';
    }
    valueOf() {
      return this.toString();
    }
  }

  return new LocaleId() as string;
}
