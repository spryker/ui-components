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
  HostBinding,
} from '@angular/core';
import { DateWorkDaysToken } from './tokens';
import { ToBoolean, ToJson } from '@spryker/utils';

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
  @Input() @ToJson() enableDate?: EnableDateOptions;
  @Input() @ToBoolean() open = false;
  @Input()
  set date(value: Date) {
    this._date = value ? new Date(value) : undefined;
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
  @HostBinding('class.open') isOpen = false;

  constructor(@Inject(DateWorkDaysToken) private dateWorkDaysToken: number[]) {}

  ngOnChanges(): void {
    this.updatePicker();

    if (typeof this.enableDate === 'function') {
      this.convertEnableDateFuncToFunc(this.enableDate as EnableDateFunction);
    }

    if (typeof this.enableDate === 'object') {
      this.convertEnableDateObjToFunc(this.enableDate as EnableDate);
    }
  }

  ngAfterViewChecked() {
    if (!this._picker && this.datePicker) {
      this._picker = this.datePicker;

      this.updatePicker();
    }
  }

  private convertEnableDateFuncToFunc(enableDateObj: EnableDateFunction) {
    this.disabledDate = (date: Date): boolean => {
      const originalResult = enableDateObj(date);

      return !originalResult;
    };
  }

  private convertEnableDateObjToFunc(enableDateObj: EnableDate): void {
    const convertedEnableDate = this.convertStringsToDates(enableDateObj);

    this.disabledDate = (date: Date): boolean => {
      const isDateLessThanFrom =
        convertedEnableDate.from &&
        date.getTime() < convertedEnableDate.from.getTime();
      const isToLessThatDate =
        convertedEnableDate.to &&
        convertedEnableDate.to.getTime() < date.getTime();
      const isDateInWorkDays =
        convertedEnableDate.onlyWorkDays &&
        this.dateWorkDaysToken.includes(date.getDay());

      return Boolean(
        isDateLessThanFrom || isToLessThatDate || isDateInWorkDays,
      );
    };
  }

  openChangeEvent(isOpen: boolean) {
    this.isOpen = isOpen;
    this.openChange.emit(isOpen);
  }

  private convertStringsToDates(obj: EnableDate) {
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
  }

  openPicker(): void {
    this._picker?.picker.showOverlay(); // used private API of NzDatePickerComponent
  }

  closePicker(): void {
    this._picker?.picker.hideOverlay(); // used private API of NzDatePickerComponent
  }
}
