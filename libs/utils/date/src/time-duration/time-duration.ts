import { DateService } from '@spryker/utils/date';
import { TimeDurationData } from './types';

export class TimeDuration {
  readonly years?: number;
  readonly days?: number;
  readonly hours?: number;
  readonly minutes?: number;
  readonly seconds?: number;
  readonly milliseconds?: number;

  constructor(
    private data: TimeDurationData,
    private dateService: DateService,
  ) {
    this.dateService = dateService;
    this.years = data.years;
    this.days = data.days;
    this.hours = data.hours;
    this.minutes = data.minutes;
    this.seconds = data.seconds;
    this.milliseconds = data.milliseconds;
  }

  addTo(date: Date | number): Date {
    const currentDate = date instanceof Date ? date : new Date(date);
    const addActions = (this.dateService.add as unknown) as Record<
      string,
      Function
    >;

    return Object.keys(this.data).reduce((prevValue, currentValue) => {
      return addActions[currentValue](
        prevValue,
        ((this as unknown) as Record<string, number>)[currentValue],
      );
    }, currentDate);
  }
}
