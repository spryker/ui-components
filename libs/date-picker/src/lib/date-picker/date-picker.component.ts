import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  OnChanges,
  OnInit,
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

interface ConvertedEnableTimeRange {
  onlyWorkHours?: boolean;
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
export class DatePickerComponent
  implements OnInit, OnChanges, AfterViewChecked {
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
        const enabledHours = enableTimeConfig.hours();

        return hours.filter(hour => !enabledHours.includes(hour));
      };

      const nzDisabledMinutes = () => {
        const minutes = new Array(60).fill(null).map((_, index) => index);
        const enabledMinutes = enableTimeConfig.minutes(24);

        return minutes.filter(minute => !enabledMinutes.includes(minute));
      };

      const nzDisabledSeconds = () => [];

      return { nzDisabledHours, nzDisabledMinutes, nzDisabledSeconds };
    };
  }

  private convertEnableDateObjToFunc(enableDateObj: EnableDate): void {
    const convertedEnableDate = this.getConvertedDateObject(enableDateObj);

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
    if (!enableTime) {
      this.disabledTime = undefined;

      return;
    }

    const convertedEnableTime = this.getConvertedTimeObject(enableTime);

    const enabledHours = new Set<number>();

    const fromHours = convertedEnableTime.from?.getHours();
    const fromMinutes = convertedEnableTime.from?.getMinutes();

    const toHours = convertedEnableTime.to?.getHours();
    const toMinutes = convertedEnableTime.to?.getMinutes();

    const hoursFromTo = new Array(24).fill(null).map((_, index) => index);
    const minutesFromTo = new Array(60).fill(null).map((_, index) => index);

    const workHoursRanges = [...this.dateWorkHoursToken];

    if (fromHours !== undefined && toHours !== undefined) {
      workHoursRanges.push([
        // tslint:disable-next-line:no-non-null-assertion
        [fromHours, fromMinutes!],
        // tslint:disable-next-line:no-non-null-assertion
        [toHours, toMinutes!],
      ]);
    }

    const filteredHoursFromTo = this.getTimeRange(
      hoursFromTo,
      fromHours,
      toHours,
    );
    const filteredOnlyWorkHoursFromTo = this.filterHoursRange(
      workHoursRanges,
      hoursFromTo,
    );

    if (!convertedEnableTime.onlyWorkHours) {
      filteredHoursFromTo.forEach(hour => enabledHours.add(hour));
    } else {
      filteredOnlyWorkHoursFromTo.forEach(hour => enabledHours.add(hour));
    }

    const disabledHours = new Array(24)
      .fill(null)
      .map((_, index) => index)
      .filter(hour => !enabledHours.has(hour));

    this.disabledTime = (): NzDisabledTimeConfig => {
      const nzDisabledHours = () => disabledHours;
      const nzDisabledMinutes = (hour: number) => {
        return this.filterMinutesRange(workHoursRanges, hour, minutesFromTo);
      };
      const nzDisabledSeconds = () => [];

      return { nzDisabledHours, nzDisabledMinutes, nzDisabledSeconds };
    };
  }

  private filterMinutesRange(
    workHoursRanges: number[][][],
    hour: number,
    minutesFromTo: number[],
  ): number[] {
    const enabledMinutesSet = new Set<number>();

    if (hour === undefined) {
      return [];
    }

    workHoursRanges.forEach(range => {
      let from: number | undefined;
      let to: number | undefined;

      if (hour === range[0][0]) {
        from = range[0][1];
      }

      if (hour === range[1][0]) {
        to = range[1][1];
      }

      if (from === undefined && to === undefined) {
        return;
      }

      const timeRange = this.getTimeRange(minutesFromTo, from, to);

      timeRange.forEach(minute => enabledMinutesSet.add(minute));
    });

    if (enabledMinutesSet.size === 0) {
      return [];
    }

    return minutesFromTo.filter(minute => !enabledMinutesSet.has(minute));
  }

  private filterHoursRange(
    workHoursRanges: number[][][],
    hoursFromTo: number[],
  ): number[] {
    const enabledHoursSet = new Set<number>();

    workHoursRanges.forEach(range => {
      const from = range[0][0];
      const to = range[1][0];

      const timeRange = this.getTimeRange(hoursFromTo, from, to);

      timeRange.forEach(hour => enabledHoursSet.add(hour));
    });

    return hoursFromTo.filter(hour => enabledHoursSet.has(hour));
  }

  private getTimeRange(
    fromTo: number[],
    from: number | undefined,
    to: number | undefined,
  ): number[] {
    return fromTo.filter((hour: number) => {
      if (from !== undefined && hour < from) {
        return false;
      }

      if (to !== undefined && hour > to) {
        return false;
      }

      return true;
    });
  }

  private getConvertedDateObject(obj: EnableDate): ConvertedEnableDateRange {
    return {
      onlyWorkDays: obj.onlyWorkDays,
      from: this.convertValueToDate(obj.from as string | Date),
      to: this.convertValueToDate(obj.to as string | Date),
    };
  }

  private getConvertedTimeObject(obj: EnableTime): ConvertedEnableTimeRange {
    return {
      onlyWorkHours: obj.onlyWorkHours,
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
    if (
      typeof this.time === 'string' &&
      this.time !== 'true' &&
      this.time !== 'false'
    ) {
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

  openChangeEvent(isOpen: boolean): void {
    this.isOpen = isOpen;
    this.openChange.emit(isOpen);
  }

  openPicker(): void {
    this._picker?.picker.showOverlay(); // used private API of NzDatePickerComponent
  }

  closePicker(): void {
    this._picker?.picker.hideOverlay(); // used private API of NzDatePickerComponent
  }
}
