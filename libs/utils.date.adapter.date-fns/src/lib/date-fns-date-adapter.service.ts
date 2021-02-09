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
    days: (date: Date, years: number) => addDays(date, years),
    hours: (date: Date, years: number) => addHours(date, years),
    minutes: (date: Date, years: number) => addMinutes(date, years),
    seconds: (date: Date, years: number) => addSeconds(date, years),
    milliseconds: (date: Date, years: number) => addMilliseconds(date, years),
  };
  sub = {
    years: (date: Date, years: number) => subYears(date, years),
    days: (date: Date, years: number) => subDays(date, years),
    hours: (date: Date, years: number) => subHours(date, years),
    minutes: (date: Date, years: number) => subMinutes(date, years),
    seconds: (date: Date, years: number) => subSeconds(date, years),
    milliseconds: (date: Date, years: number) => subMilliseconds(date, years),
  };

  parse(date: string): Date {
    return parseISO(date);
  }
}
