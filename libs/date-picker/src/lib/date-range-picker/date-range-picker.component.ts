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
  @Output() datesChange = new EventEmitter<DateRangeValue>();
}
