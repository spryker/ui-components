import { Injectable } from '@angular/core';
import { DateService } from '../date';
import { TimeDuration } from './time-duration';
import { InvalidTimeDuration } from './invalid-time-duration';
import { TimeDurationConfig } from './time-duration-config';
import { TimeDurationString, TimeDurationData } from './types';

/**
 * Provides abstraction for a duration of time that can be added to any Date.
 * Allows to parse a duration string into a Time Duration object.
 */
@Injectable({
    providedIn: 'root',
})
export class TimeDurationService {
    constructor(
        private dateService: DateService,
        private config: TimeDurationConfig,
    ) {}

    parse(interval: TimeDurationString): TimeDuration {
        const durationComponents = interval.split(this.config.separator);
        const correctOrder = [
            {
                token: this.config.yearToken,
                key: 'years',
                min: 1,
                max: 999,
            },
            {
                token: this.config.monthToken,
                key: 'months',
                min: 1,
                max: 12,
            },
            {
                token: this.config.dayToken,
                key: 'days',
                min: 1,
                max: 365,
            },
            {
                token: this.config.hourToken,
                key: 'hours',
                min: 1,
                max: 23,
            },
            {
                token: this.config.minuteToken,
                key: 'minutes',
                min: 1,
                max: 59,
            },
            {
                token: this.config.secondToken,
                key: 'seconds',
                min: 1,
                max: 59,
            },
            {
                token: this.config.millisecondToken,
                key: 'milliseconds',
                min: 1,
                max: 59,
            },
        ];
        const data: TimeDurationData = {};

        for (let i = 0; i < durationComponents.length; i++) {
            const intervalValue = durationComponents[i];
            const token = intervalValue.replace(/[0-9]/g, '');
            const numberValue = Number(intervalValue.replace(/\D/g, ''));
            const orderIndex = correctOrder.findIndex((value) => value.token === token);
            const isIndexExist = orderIndex !== -1;
            const min = correctOrder[orderIndex]?.min ?? NaN;
            const max = correctOrder[orderIndex]?.max ?? NaN;
            const inRange = numberValue >= min && numberValue <= max;

            if (isIndexExist && numberValue === 0) {
                continue;
            }

            if (!isIndexExist || !inRange) {
                return new InvalidTimeDuration(data, this.dateService);
            }

            const { key } = correctOrder[orderIndex];

            data[key as keyof TimeDurationData] = numberValue;
            correctOrder.splice(0, orderIndex + 1);
        }

        return new TimeDuration(data, this.dateService);
    }
}
