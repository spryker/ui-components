import { InjectionToken } from '@angular/core';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { InjectableType } from '@spryker/utils';

import { DateAdapter } from './types';

export const DateAdapterToken = new InjectionToken<DateAdapter>('DateAdapter');

export function provideDateAdapter(adapter: InjectableType<DateAdapter>) {
    return {
        provide: DateAdapterToken,
        useExisting: adapter,
    };
}
