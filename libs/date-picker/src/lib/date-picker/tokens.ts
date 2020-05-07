import { InjectionToken } from '@angular/core';

export type DateWorkDays = number[];

export const DateWorkDaysToken = new InjectionToken<DateWorkDays>(
  'DateWorkDaysToken',
  {
    providedIn: 'root',
    factory: () => [1, 2, 3, 4, 5],
  },
);
