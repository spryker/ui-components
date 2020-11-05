import { InjectionToken } from '@angular/core';

export type DateWorkDays = number[];
export type DateHoursPair = [number, number]; // [hours, minutes]
export type DateWorkHours = [DateHoursPair, DateHoursPair][]; // [from, to][]

export function getWorkDaysNumbers(): DateWorkDays {
  return [1, 2, 3, 4, 5];
}

export function getWorkHoursNumbers(): DateWorkHours {
  return [
    [
      [9, 0],
      [18, 0],
    ],
  ];
}

// Token holds array of number of days in a week and by default includes days from Monday to Friday
export const DateWorkDaysToken = new InjectionToken<DateWorkDays>(
  'DateWorkDaysToken',
  {
    providedIn: 'root',
    factory: getWorkDaysNumbers,
  },
);

// Token holds array of number of hours in a day and by default includes hours from 9 to 18
export const DateWorkHoursToken = new InjectionToken<DateWorkHours>(
  'DateWorkHoursToken',
  {
    providedIn: 'root',
    factory: getWorkHoursNumbers,
  },
);
