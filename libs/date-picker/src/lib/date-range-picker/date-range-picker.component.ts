import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { ToBoolean } from '@spryker/utils';
import { DateRangeValueInput, DateRangeValue } from './types';

@Component({
  selector: 'spy-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangePickerComponent {
  @Input() dates: DateRangeValueInput = {};
  @Input() @ToBoolean() clearButton = true;
  @Input() @ToBoolean() disabled = false;
  @Input() format?: string;
  @Input() placeholderFrom?: string;
  @Input() placeholderTo?: string;
  @Input() nameFrom?: string;
  @Input() nameTo?: string;
  @Output() datesChange = new EventEmitter<DateRangeValue>();

  datesChangeHandler(dates: DateRangeValue): void {
    // TODO: Add condition when input time is falsy when time feature will be added
    dates.from?.setHours(0, 0, 0);
    dates.to?.setHours(23, 59, 59);

    this.datesChange.emit(dates);
  }
}
