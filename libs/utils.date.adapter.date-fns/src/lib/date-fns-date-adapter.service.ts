import { Injectable } from '@angular/core';
import { DateAdapter } from '@spryker/utils/date';
import {
  addDays,
  addHours,
  addMilliseconds,
  addMinutes,
  addSeconds,
  addYears,
  parseISO,
  subDays,
  subHours,
  subMilliseconds,
  subMinutes,
  subSeconds,
  subYears,
} from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class DateFnsDateAdapterService implements DateAdapter {
  add = {
    years: (date: Date, years: number) => addYears(date, years),
    days: (date: Date, days: number) => addDays(date, days),
    hours: (date: Date, hours: number) => addHours(date, hours),
    minutes: (date: Date, minutes: number) => addMinutes(date, minutes),
    seconds: (date: Date, seconds: number) => addSeconds(date, seconds),
    milliseconds: (date: Date, milliseconds: number) =>
      addMilliseconds(date, milliseconds),
  };
  sub = {
    years: (date: Date, years: number) => subYears(date, years),
    days: (date: Date, days: number) => subDays(date, days),
    hours: (date: Date, hours: number) => subHours(date, hours),
    minutes: (date: Date, minutes: number) => subMinutes(date, minutes),
    seconds: (date: Date, seconds: number) => subSeconds(date, seconds),
    milliseconds: (date: Date, milliseconds: number) =>
      subMilliseconds(date, milliseconds),
  };

  parse(date: string): Date {
    return parseISO(date);
  }
}
