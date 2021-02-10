import { InjectionToken } from '@angular/core';
import { InjectableType } from '@spryker/utils';

import { DateAdapter } from './types';

export const DateAdapterToken = new InjectionToken<DateAdapter>('DateAdapter');

export function provideDateAdapter(adapter: InjectableType<DateAdapter>) {
  return {
    provide: DateAdapterToken,
    useExisting: adapter,
  };
}
