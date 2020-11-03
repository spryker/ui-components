import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  OnChanges, OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { IconCalendarModule } from '@spryker/icon/icons';
import { InjectionTokenType, ToBoolean, ToJson } from '@spryker/utils';

import { DateWorkDaysToken, DateWorkHoursToken } from './tokens';

interface EnableDateRange {
  from?: Date | string;
  to?: Date | string;
}

interface EnableDate extends EnableDateRange {
  onlyWorkDays?: boolean;
}

interface EnableTime extends EnableDateRange {
  onlyWorkHours?: boolean;
}

interface ConvertedEnableDateRange {
  onlyWorkDays?: boolean;
  from?: Date;
  to?: Date;
}

interface EnableTimeConfig {
  hours: () => number[];
  minutes: (hour: number) => number[];
  seconds: (hour: number, minute: number) => number[];
}

interface NzDisabledTimeConfig {
  nzDisabledHours: () => number[];
  nzDisabledMinutes: (hour: number) => number[];
  nzDisabledSeconds: (hour: number, minute: number) => number[];
}

export type EnableDateOptions = EnableDate | EnableDateFunction;
export type EnableTimeOptions = EnableTime | EnableTimeFunction;
export type EnableDateFunction = (current: Date) => boolean;
export type EnableTimeFunction<C = EnableTimeConfig> = (current: Date) => C;

@Component({
  selector: 'spy-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent implements OnInit, OnChanges, AfterViewChecked {
  private static DefaultFormat = 'dd.MM.yyyy';

  @Input() @ToBoolean() clearButton = true;
  @Input() @ToBoolean() disabled = false;
  @Input() @ToJson() enableDate?: EnableDateOptions;
  @Input() @ToJson() enableTime?: EnableTimeOptions;
  @Input() @ToBoolean() open = false;
  @Input()
  set date(value: Date | string) {
    this._date = value ? this.convertValueToDate(value) : undefined;
  }

  get date(): Date | string {
    return this._date as Date;
  }

  @Input() format = DatePickerComponent.DefaultFormat;
  @Input() placeholder?: string;
  @Input() name?: string;
  @Input() time?: { nzFormat: string } | string | boolean;
  @Output() dateChange = new EventEmitter<Date>();
  @Output() openChange = new EventEmitter<boolean>();

  @ViewChild('datePicker', { static: false }) datePicker?: any;

  private _picker?: any;

  disabledDate?: EnableDateFunction;
  disabledTime?: (date: Date) => NzDisabledTimeConfig;
  _date?: Date;
  @HostBinding('class.open') isOpen = false;

  suffixIcon = IconCalendarModule.icon;

  constructor(
    @Inject(DateWorkDaysToken)
    private dateWorkDaysToken: InjectionTokenType<typeof DateWorkDaysToken>,
    @Inject(DateWorkHoursToken)
    private dateWorkHoursToken: InjectionTokenType<typeof DateWorkHoursToken>,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.updatePicker();

    if ('format' in changes && !this.format) {
      this.format = DatePickerComponent.DefaultFormat;
    }

    if (typeof this.enableDate === 'function') {
      this.convertEnableDateFuncToFunc(this.enableDate as EnableDateFunction);
    } else if (typeof this.enableDate === 'object') {
      this.convertEnableDateObjToFunc(this.enableDate as EnableDate);
    }

    if (typeof this.enableTime === 'function') {
      this.convertEnableTimeFuncToFunc(this.enableTime as EnableTimeFunction);
    } else if (typeof this.enableTime === 'object') {
      this.convertEnableTimeObjToFunc(this.enableTime as EnableTime);
    }
  }

  ngOnInit(): void {
    this.convertValueToTime();
  }

  ngAfterViewChecked(): void {
    if (!this._picker && this.datePicker) {
      this._picker = this.datePicker;

      setTimeout(() => this.updatePicker());
    }
  }

  private convertEnableDateFuncToFunc(enableDateObj: EnableDateFunction): void {
    this.disabledDate = (date: Date): boolean => !enableDateObj(date);
  }

  private convertEnableTimeFuncToFunc(enableTime: EnableTimeFunction): void {
    this.disabledTime = (date: Date): NzDisabledTimeConfig => {
      const enableTimeConfig = enableTime(date);

      const nzDisabledHours = () => {
        const hours = new Array(24).fill(null).map((_, index) => index);
        const enableHours = enableTimeConfig.hours();

        return hours.filter((hour: number) => !enableHours.includes(hour));
      }

      const nzDisabledMinutes = () => {
        const minutes = new Array(60).fill(null).map((_, index) => index);
        const enableMinutes = enableTimeConfig.minutes(24);

        return minutes.filter((minute: number) => !enableMinutes.includes(minute));
      }

      const nzDisabledSeconds = () => {
        const seconds = new Array(60).fill(null).map((_, index) => index);
        const enableSeconds = enableTimeConfig.seconds(24, 60);

        return seconds.filter((second: number) => !enableSeconds.includes(second));
      }

      return { nzDisabledHours, nzDisabledMinutes, nzDisabledSeconds };
    };
  }

  private convertEnableDateObjToFunc(enableDateObj: EnableDate): void {
    const convertedEnableDate = this.getConvertedObject(enableDateObj);

    this.disabledDate = (date: Date): boolean => {
      if (
        convertedEnableDate.from &&
        date.getTime() < convertedEnableDate.from.getTime()
      ) {
        return true;
      }

      if (
        convertedEnableDate.to &&
        convertedEnableDate.to.getTime() < date.getTime()
      ) {
        return true;
      }

      if (
        convertedEnableDate.onlyWorkDays &&
        !this.dateWorkDaysToken.includes(date.getDay())
      ) {
        return true;
      }

      return false;
    };
  }

  private convertEnableTimeObjToFunc(enableTime: EnableTime): void {
    const convertedEnableTime = this.getConvertedObject(enableTime);
    const enableHours = new Set<number>();
    const enableMinutes = new Set<number>();
    const enableSeconds = new Set<number>();

    if (convertedEnableTime.from) {
      const fromHours = convertedEnableTime.from.getHours();
      const fromMinutes = convertedEnableTime.from.getMinutes();
      const fromSeconds = convertedEnableTime.from.getSeconds();
      const hours = new Array(24 - fromHours).fill(null).map((_, index) => index);
      const minutes = new Array(60 - fromMinutes).fill(null).map((_, index) => index);
      const seconds = new Array(60 - fromSeconds).fill(null).map((_, index) => index);

      hours.forEach((hour: number) => enableHours.add(hour));
      minutes.forEach((minute: number) => enableMinutes.add(minute));
      seconds.forEach((second: number) => enableSeconds.add(second));
    }

    if (convertedEnableTime.to) {
      const toHours = convertedEnableTime.to.getHours();
      const toMinutes = convertedEnableTime.to.getMinutes();
      const toSeconds = convertedEnableTime.to.getSeconds();
      const hours = new Array(toHours).fill(null).map((_, index) => index);
      const minutes = new Array(toMinutes).fill(null).map((_, index) => index);
      const seconds = new Array(toSeconds).fill(null).map((_, index) => index);

      hours.forEach((hour: number) => enableHours.add(hour));
      minutes.forEach((minute: number) => enableMinutes.add(minute));
      seconds.forEach((second: number) => enableSeconds.add(second));
    }

    if (convertedEnableTime.onlyWorkDays) {
      const hoursRangeStart = this.dateWorkHoursToken[0][0][0];
      const hoursRangeEnd = this.dateWorkHoursToken[0][1][0];
      const hoursRangeResult = hoursRangeEnd - hoursRangeStart + 1;
      const hours = new Array(hoursRangeResult).fill(null).map((_, index) => hoursRangeStart + index);

      const minutesRangeStart = this.dateWorkHoursToken[0][0][1];
      const minutesRangeEnd = this.dateWorkHoursToken[0][1][1];
      const minutesRangeResult = minutesRangeEnd - minutesRangeStart + 1;
      const minutes = new Array(minutesRangeResult).fill(null).map((_, index) => minutesRangeStart + index);

      hours.forEach((hour: number) => enableHours.add(hour));
      minutes.forEach((minute: number) => enableMinutes.add(minute));
    }
  }

  openChangeEvent(isOpen: boolean): void {
    this.isOpen = isOpen;
    this.openChange.emit(isOpen);
  }

  private getConvertedObject(obj: EnableDate): ConvertedEnableDateRange {
    return {
      onlyWorkDays: obj.onlyWorkDays,
      from: this.convertValueToDate(obj.from as string | Date),
      to: this.convertValueToDate(obj.to as string | Date),
    };
  }

  private convertValueToDate(value: string | Date): Date | undefined {
    if (!value) {
      return undefined;
    }

    return value instanceof Date ? value : new Date(value);
  }

  private convertValueToTime(): void {
    if (typeof this.time === 'string' && (this.time !== 'true' && this.time !== 'false')) {
      this.time = { nzFormat: this.time };
    }
  }

  private updatePicker(): void {
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
