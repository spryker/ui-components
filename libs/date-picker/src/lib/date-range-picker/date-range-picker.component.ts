import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { ToBoolean, ToJson } from '@spryker/utils';
import { DateRangeValueInput, DateRangeValue } from './types';

@Component({
  selector: 'spy-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangePickerComponent {
  @Input() @ToJson() dates: DateRangeValueInput = {};
  @Input() @ToBoolean() clearButton = true;
  @Input() @ToBoolean() disabled = false;
  @Input() format?: string;
  @Input() placeholderFrom?: string;
  @Input() placeholderTo?: string;
  @Input() nameFrom?: string;
  @Input() nameTo?: string;
  @Input() time?: string | boolean;
  @Output() datesChange = new EventEmitter<DateRangeValue>();

  datesChangeHandler(dates: DateRangeValue): void {
    dates.from = this.normalizeDate(dates.from, 0, 0, 0);
    dates.to = this.normalizeDate(dates.to, 23, 59, 59);

    this.datesChange.emit(dates);
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
      date.setHours(hour, min, sec);
    }

    return date;
  }
}
