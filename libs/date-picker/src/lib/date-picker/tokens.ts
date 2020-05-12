import { InjectionToken } from '@angular/core';

export type DateWorkDays = number[];

export const getWorkDaysNumbers = (): number[] => [1, 2, 3, 4, 5];

// Token holds array of number of days in a week and by default includes days from Monday to Friday
export const DateWorkDaysToken = new InjectionToken<DateWorkDays>(
  'DateWorkDaysToken',
  {
    providedIn: 'root',
    factory: getWorkDaysNumbers,
  },
);
