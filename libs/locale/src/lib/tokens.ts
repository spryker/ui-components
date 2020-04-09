import { InjectionToken } from '@angular/core';

import { LocaleRecord, LocaleLoaderRegistrarMap } from './types';

export const LocaleRecordsToken = new InjectionToken<LocaleRecord[][]>(
  'LocaleRecords',
);

export const LocaleDefaultToken = new InjectionToken<string>('LocaleDefault');

export const LocaleLoaderRegistrarsToken = new InjectionToken<
  LocaleLoaderRegistrarMap[]
>('LocaleLoaderRegistrars');
