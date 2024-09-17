import { DateAdapter } from '../date';
import { TimeDurationData } from './types';

export class TimeDuration {
    readonly years?: number;
    readonly months?: number;
    readonly days?: number;
    readonly hours?: number;
    readonly minutes?: number;
    readonly seconds?: number;
    readonly milliseconds?: number;

    constructor(
        private data: TimeDurationData,
        private dateAdapter: DateAdapter,
    ) {
        this.dateAdapter = dateAdapter;
        this.years = data.years;
        this.months = data.months;
        this.days = data.days;
        this.hours = data.hours;
        this.minutes = data.minutes;
        this.seconds = data.seconds;
        this.milliseconds = data.milliseconds;
    }

    addTo(date: Date | number): Date {
        const currentDate = date instanceof Date ? date : new Date(date);

        return Object.keys(this.data).reduce((prevDate, dataKey) => {
            const dateType = dataKey as keyof TimeDurationData;
            const value = this.data[dateType];

            if (!value) {
                return prevDate;
            }

            return this.dateAdapter.add[dateType](prevDate, value);
        }, currentDate);
    }
}
