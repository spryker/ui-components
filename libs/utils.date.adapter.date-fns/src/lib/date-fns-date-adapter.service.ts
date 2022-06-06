import { Injectable } from '@angular/core';
import { DateAdapter } from '@spryker/utils/date';
import {
    addDays,
    addHours,
    addMilliseconds,
    addMinutes,
    addMonths,
    addSeconds,
    addYears,
    parseISO,
    subDays,
    subHours,
    subMilliseconds,
    subMinutes,
    subMonths,
    subSeconds,
    subYears,
} from 'date-fns';

@Injectable({
    providedIn: 'root',
})
export class DateFnsDateAdapterService implements DateAdapter {
    add = {
        years: addYears,
        months: addMonths,
        days: addDays,
        hours: addHours,
        minutes: addMinutes,
        seconds: addSeconds,
        milliseconds: addMilliseconds,
    };
    sub = {
        years: subYears,
        months: subMonths,
        days: subDays,
        hours: subHours,
        minutes: subMinutes,
        seconds: subSeconds,
        milliseconds: subMilliseconds,
    };

    parse(date: string): Date {
        return parseISO(date);
    }
}
