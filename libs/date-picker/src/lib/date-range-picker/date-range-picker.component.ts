import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ToBoolean, ToJson } from '@spryker/utils';

import { DatePickerComponent } from '../date-picker/date-picker.component';
import { DateRangeValue, DateRangeValueInput } from './types';

@Component({
  selector: 'spy-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangePickerComponent {
  private static HoursRange = [...Array(24).keys()];
  private static MinutesRange = [...Array(60).keys()];

  @Input() @ToJson() dates: DateRangeValueInput = {};
  @Input() @ToBoolean() clearButton = true;
  @Input() @ToBoolean() disabled = false;
  @Input() @ToBoolean() time?: boolean;
  @Input() format?: string;
  @Input() placeholderFrom?: string;
  @Input() placeholderTo?: string;
  @Input() nameFrom?: string;
  @Input() nameTo?: string;
  @Output() datesChange = new EventEmitter<DateRangeValue>();

  @ViewChild('startPicker', { static: true }) startPicker?: DatePickerComponent;
  @ViewChild('endPicker', { static: true }) endPicker?: DatePickerComponent;

  timeTo = this.enabledTimeTo.bind(this);
  timeFrom = this.enabledTimeFrom.bind(this);

  enabledTimeFrom(current: Date) {
    const { hours, minutes } = this.getHoursAndMinutes(current, this.dates.to);

    return {
      hours: () =>
        hours
          ? DateRangePickerComponent.HoursRange.slice(0, hours)
          : DateRangePickerComponent.HoursRange,
      minutes: () =>
        minutes
          ? DateRangePickerComponent.MinutesRange.slice(0, minutes)
          : DateRangePickerComponent.MinutesRange,
    };
  }

  enabledTimeTo(current: Date) {
    const { hours, minutes } = this.getHoursAndMinutes(
      current,
      this.dates.from,
    );

    return {
      hours: () =>
        hours
          ? DateRangePickerComponent.HoursRange.slice(hours)
          : DateRangePickerComponent.HoursRange,
      minutes: () =>
        minutes
          ? DateRangePickerComponent.MinutesRange.slice(minutes)
          : DateRangePickerComponent.MinutesRange,
    };
  }

  getHoursAndMinutes(current: Date, date?: Date | string) {
    const config = {
      minutes: 0,
      hours: 0,
    };

    if (!date || !current) {
      return config;
    }

    if (this.getDateTime(date) === this.getDateTime(current)) {
      date = new Date(date);

      config.hours = date.getHours();
      config.minutes = date.getMinutes();

      return config;
    }

    return config;
  }

  datesChangeHandler(dates: DateRangeValue): void {
    dates.from = this.normalizeDate(dates.from, 0, 0, 0);
    dates.to = this.normalizeDate(dates.to, 23, 59, 59);

    this.datesChange.emit(dates);
  }

  dateFromChange(dates: DateRangeValue) {
    this.datesChangeHandler(dates);
    this.timeTo = this.enabledTimeTo.bind(this);
  }

  dateToChange(dates: DateRangeValue) {
    this.datesChangeHandler(dates);

    this.timeFrom = this.enabledTimeFrom.bind(this);
  }

  getDateTime(date?: Date | string): number | undefined {
    if (!date) {
      return undefined;
    }

    const copyDate = new Date(date);

    copyDate.setHours(0, 0, 0, 0);

    return copyDate.getTime();
  }

  private normalizeDate(
    date: Date | string | undefined,
    hour: number,
    min: number,
    sec: number,
  ): Date | undefined {
    if (!date) {
      return;
    }

    if (typeof date === 'string') {
      date = new Date(date);
    }

    if (!this.time) {
      date.setHours(hour, min, sec, 0);
    }

    return date;
  }
}
