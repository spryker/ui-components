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

        return hours.filter((hour: number) => !enabledHours.includes(hour));
      };

      const nzDisabledMinutes = () => {
        const minutes = new Array(60).fill(null).map((_, index) => index);
        const enabledMinutes = enableTimeConfig.minutes(24);

        return minutes.filter(
          (minute: number) => !enabledMinutes.includes(minute),
        );
      };

      const nzDisabledSeconds = () => {
        const seconds = new Array(60).fill(null).map((_, index) => index);
        const enabledSeconds = enableTimeConfig.seconds(24, 60);

        return seconds.filter(
          (second: number) => !enabledSeconds.includes(second),
        );
      };

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
    const enabledMinutes = new Set<number>();
    const enabledSeconds = new Set<number>();

    const fromHours = convertedEnableTime.from?.getHours();
    const fromMinutes = convertedEnableTime.from?.getMinutes();
    const fromSeconds = convertedEnableTime.from?.getSeconds();

    const toHours = convertedEnableTime.to?.getHours();
    const toMinutes = convertedEnableTime.to?.getMinutes();
    const toSeconds = convertedEnableTime.to?.getSeconds();

    const hoursFromTo = new Array(24).fill(null).map((_, index) => index);
    const minutesFromTo = new Array(60).fill(null).map((_, index) => index);
    const secondsFromTo = new Array(60).fill(null).map((_, index) => index);

    const filteredHoursFromTo = this.getTimeRange(
      hoursFromTo,
      fromHours,
      toHours,
    );
    const filteredMinutesFromTo = this.getTimeRange(
      minutesFromTo,
      fromMinutes,
      toMinutes,
    );
    const filteredSecondsFromTo = this.getTimeRange(
      secondsFromTo,
      fromSeconds,
      toSeconds,
    );
    const filteredOnlyWorkHoursFromTo = this.getTimeRange(
      hoursFromTo,
      this.dateWorkHoursToken[0][0][0],
      this.dateWorkHoursToken[0][1][0],
    );
    const filteredOnlyWorkMinutesFromTo = this.getTimeRange(
      minutesFromTo,
      this.dateWorkHoursToken[0][0][1],
      this.dateWorkHoursToken[0][1][1],
    );

    if (!convertedEnableTime.onlyWorkHours) {
      filteredHoursFromTo.forEach((hour: number) => enabledHours.add(hour));
      filteredMinutesFromTo.forEach((minute: number) =>
        enabledMinutes.add(minute),
      );
      filteredSecondsFromTo.forEach((second: number) =>
        enabledSeconds.add(second),
      );
    } else {
      filteredOnlyWorkHoursFromTo.forEach((hour: number) =>
        enabledHours.add(hour),
      );
      filteredOnlyWorkMinutesFromTo.forEach((minute: number) =>
        enabledMinutes.add(minute),
      );
      filteredSecondsFromTo.forEach((second: number) =>
        enabledSeconds.add(second),
      );
    }

    const disabledHours = new Array(24)
      .fill(null)
      .map((_, index) => index)
      .filter((hour: number) => !enabledHours.has(hour));

    const disabledMinutes = new Array(60)
      .fill(null)
      .map((_, index) => index)
      .filter((minute: number) => !enabledMinutes.has(minute));

    const disabledSeconds = new Array(60)
      .fill(null)
      .map((_, index) => index)
      .filter((second: number) => !enabledSeconds.has(second));

    this.disabledTime = (): NzDisabledTimeConfig => {
      const nzDisabledHours = () => disabledHours;
      const nzDisabledMinutes = () => disabledMinutes;
      const nzDisabledSeconds = () => disabledSeconds;

      return { nzDisabledHours, nzDisabledMinutes, nzDisabledSeconds };
    };
  }

  private getTimeRange(
    fromTo: number[],
    from: number | undefined,
    to: number | undefined,
  ): number[] {
    return fromTo.filter((hour: number) => {
      if (from !== undefined && from !== 0 && hour < from) {
        return false;
      }

      if (to !== undefined && to !== 0 && hour > to) {
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
      this.time !== 'true' && this.time !== 'false'
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
