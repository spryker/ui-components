import { DateService } from '@spryker/utils/date';
import { TimeDuration } from './time-duration';
import { TimeDurationData } from './types';

export class InvalidTimeDuration extends TimeDuration {
  readonly years?: number;
  readonly months?: number;
  readonly days?: number;
  readonly hours?: number;
  readonly minutes?: number;
  readonly seconds?: number;
  readonly milliseconds?: number;

  constructor(data: TimeDurationData, dateService: DateService) {
    super(data, dateService);

    this.years = NaN;
    this.months = NaN;
    this.days = NaN;
    this.hours = NaN;
    this.minutes = NaN;
    this.seconds = NaN;
    this.milliseconds = NaN;
  }

  addTo(date: Date | number): Date {
    return date instanceof Date ? date : new Date(date);
  }
}
