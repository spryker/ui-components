import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  Inject,
  ViewChild,
  OnChanges,
  AfterViewChecked,
  ChangeDetectorRef,
} from '@angular/core';
import { DateWorkDaysToken } from './tokens';
import { ToBoolean } from '@spryker/utils';

interface EnableDateRange {
  from?: Date | string;
  to?: Date | string;
}

interface EnableDate extends EnableDateRange {
  onlyWorkDays?: boolean;
}

export type EnableDateOptions = EnableDate | EnableDateFunction;
export type EnableDateFunction = (current: Date) => boolean;

export interface DatePickerComponent {
  disabledDate?: EnableDateFunction;
  openPicker(): void;
  closePicker(): void;
}

@Component({
  selector: 'spy-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent
  implements DatePickerComponent, OnChanges, AfterViewChecked {
  @Input() @ToBoolean() clearButton = true;
  @Input() @ToBoolean() disabled = false;
  @Input() enableDate?: EnableDateOptions;
  @Input() @ToBoolean() open = false;
  @Input()
  set date(value: Date) {
    this._date = new Date(value);
  }

  get date(): Date {
    return this._date as Date;
  }
  @Input() format?: string;
  @Input() placeholder?: string;
  @Output() dateChange: EventEmitter<Date> = new EventEmitter();
  @Output() openChange: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('datePicker', { static: false }) datePicker?: any;

  private _picker?: any;

  disabledDate?: EnableDateFunction;
  _date?: Date;

  constructor(
    @Inject(DateWorkDaysToken) private dateWorkDaysToken: number[],
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnChanges(): void {
    this.updatePicker();

    const originalEnableDate = this.enableDate;

    if (typeof originalEnableDate === 'function') {
      this.disabledDate = (date: Date): boolean => {
        const originalResult = originalEnableDate(date);

        return !originalResult;
      };
    } else if (typeof originalEnableDate === 'object') {
      const convertedEnableDate = this.convertStringsToDates(
        originalEnableDate,
      );

      this.disabledDate = (date: Date): boolean => {
        const isDateLessThanFrom =
            convertedEnableDate.from &&
            date.getTime() < convertedEnableDate.from.getTime(),
          isToLessThatDate =
            convertedEnableDate.to &&
            convertedEnableDate.to.getTime() < date.getTime(),
          isDateInWorkDays =
            convertedEnableDate.onlyWorkDays &&
            this.dateWorkDaysToken.includes(date.getDay());

        return isDateLessThanFrom || isToLessThatDate || isDateInWorkDays
          ? true
          : false;
      };
    }
  }

  ngAfterViewChecked() {
    if (!this._picker && this.datePicker) {
      this._picker = this.datePicker;

      this.updatePicker();
    }
  }

  convertStringsToDates(obj: EnableDate) {
    return {
      onlyWorkDays: obj.onlyWorkDays,
      from: obj.from && new Date(obj.from as string | Date),
      to: obj.to && new Date(obj.to as string | Date),
    };
  }

  private updatePicker() {
    if (this.open) {
      this.openPicker();
    } else {
      this.closePicker();
    }

    this.cdr.detectChanges();
  }

  openPicker(): void {
    this._picker?.picker.showOverlay(); // used private API of NzDatePickerComponent
    this.openChange.emit(true);
  }

  closePicker(): void {
    this._picker?.picker.hideOverlay(); // used private API of NzDatePickerComponent
    this.openChange.emit(false);
  }
}

// unit tests for real picker
// add ant component to module test that picker was opened
