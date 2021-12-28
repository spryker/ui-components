import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { IconCalendarModule } from '@spryker/icon/icons';
import { InjectionTokenType, ToBoolean, ToJson } from '@spryker/utils';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';

import { DateWorkDaysToken, DateWorkHoursToken } from './tokens';
import {
  EnableDate,
  EnableDateFunction,
  EnableDateOptions,
  EnableTime,
  EnableTimeFunction,
  EnableTimeOptions,
} from './types';

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

interface NzDisabledTimeConfig {
  nzDisabledHours: () => number[];
  nzDisabledMinutes: (hour?: number) => number[];
  nzDisabledSeconds: (hour?: number, minute?: number) => number[];
}

@Component({
  selector: 'spy-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent implements OnChanges, AfterViewChecked {
  private static DefaultFormat = 'dd.MM.yyyy';
  private static HoursRange = [...Array(24).keys()];
  private static MinutesRange = [...Array(60).keys()];

  @Input() @ToBoolean() clearButton = true;
  @Input() @ToBoolean() disabled = false;
  @Input() @ToJson() enableDate?: EnableDateOptions;
  @Input() @ToJson() enableTime?: EnableTimeOptions;
  @Input() @ToBoolean() open = false;
  @Input() @ToBoolean() time?: boolean;
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
  @Output() dateChange = new EventEmitter<Date>();
  @Output() openChange = new EventEmitter<boolean>();

  @ViewChild('datePicker', { static: false })
  datePicker?: NzDatePickerComponent;

  private _picker?: NzDatePickerComponent;

  disabledDate?: EnableDateFunction;
  disabledTime?: (date: Date) => NzDisabledTimeConfig;
  _date?: Date;
  nzTime?: { nzFormat: string };
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

    if ('time' in changes) {
      this.nzTime = this.convertValueToTime(this.time);
    }

    if ('format' in changes && !this.format) {
      this.format = DatePickerComponent.DefaultFormat;
    }

    if ('enableDate' in changes) {
      if (typeof this.enableDate === 'function') {
        this.convertEnableDateFuncToFunc(this.enableDate as EnableDateFunction);
      } else if (typeof this.enableDate === 'object') {
        this.convertEnableDateObjToFunc(this.enableDate as EnableDate);
      }
    }

    if ('enableTime' in changes && this.time) {
      if (typeof this.enableTime === 'function') {
        this.convertEnableTimeFuncToFunc(this.enableTime as EnableTimeFunction);
      } else if (typeof this.enableTime === 'object') {
        this.convertEnableTimeObjToFunc(this.enableTime as EnableTime);
      }
    }
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
        const enabledHours = enableTimeConfig.hours();

        return DatePickerComponent.HoursRange.filter(
          (hour) => !enabledHours.includes(hour),
        );
      };
      const nzDisabledMinutes = (hour?: number) => {
        const enabledMinutes = enableTimeConfig.minutes(hour);

        return DatePickerComponent.MinutesRange.filter(
          (minute) => !enabledMinutes.includes(minute),
        );
      };
      const nzDisabledSeconds = () => [];

      return { nzDisabledHours, nzDisabledMinutes, nzDisabledSeconds };
    };
  }

  private convertEnableDateObjToFunc(enableDateObj: EnableDate): void {
    const convertedEnableDate = this.getConvertedDateObject(enableDateObj);
    const fromDate =
      convertedEnableDate.from && new Date(convertedEnableDate.from.getTime());
    const toDate =
      convertedEnableDate.to && new Date(convertedEnableDate.to.getTime());

    if (fromDate) {
      fromDate?.setHours(0, 0, 0, 0);
    }

    if (toDate) {
      toDate?.setHours(0, 0, 0, 0);
    }

    this.disabledDate = (date: Date): boolean => {
      const copyDate = new Date(date.getTime());

      copyDate.setHours(0, 0, 0, 0);

      if (fromDate && copyDate.getTime() < fromDate.getTime()) {
        return true;
      }

      if (toDate && toDate.getTime() < copyDate.getTime()) {
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
    const workHoursRanges = [...this.dateWorkHoursToken];

    if (fromHours !== undefined && toHours !== undefined) {
      workHoursRanges.push([
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        [fromHours, fromMinutes!],
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        [toHours, toMinutes!],
      ]);
    }

    if (!convertedEnableTime.onlyWorkHours) {
      const filteredHoursFromTo = this.getTimeRange(
        DatePickerComponent.HoursRange,
        fromHours,
        toHours,
      );

      filteredHoursFromTo.forEach((hour) => enabledHours.add(hour));
    } else {
      const filteredOnlyWorkHoursFromTo = this.filterHoursRange(
        workHoursRanges,
        DatePickerComponent.HoursRange,
      );

      filteredOnlyWorkHoursFromTo.forEach((hour) => enabledHours.add(hour));
    }

    const disabledHours = DatePickerComponent.HoursRange.filter(
      (hour) => !enabledHours.has(hour),
    );

    this.disabledTime = (): NzDisabledTimeConfig => {
      const nzDisabledHours = () => disabledHours;
      const nzDisabledMinutes = (hour?: number) =>
        this.filterMinutesRange(
          workHoursRanges,
          DatePickerComponent.MinutesRange,
          hour,
        );
      const nzDisabledSeconds = () => [];

      return { nzDisabledHours, nzDisabledMinutes, nzDisabledSeconds };
    };
  }

  private filterMinutesRange(
    workHoursRanges: number[][][],
    minutesFromTo: number[],
    hour?: number,
  ): number[] {
    if (hour === undefined) {
      return [];
    }

    const enabledMinutesSet = new Set<number>();

    workHoursRanges.forEach((range) => {
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

      timeRange.forEach((minute) => enabledMinutesSet.add(minute));
    });

    if (enabledMinutesSet.size === 0) {
      return [];
    }

    return minutesFromTo.filter((minute) => !enabledMinutesSet.has(minute));
  }

  private filterHoursRange(
    workHoursRanges: number[][][],
    hoursFromTo: number[],
  ): number[] {
    const enabledHoursSet = new Set<number>();

    workHoursRanges.forEach((range) => {
      const from = range[0][0];
      const to = range[1][0];
      const timeRange = this.getTimeRange(hoursFromTo, from, to);

      timeRange.forEach((hour) => enabledHoursSet.add(hour));
    });

    return hoursFromTo.filter((hour) => enabledHoursSet.has(hour));
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

  private convertValueToTime(value?: boolean) {
    if (!value) {
      return undefined;
    }

    return { nzFormat: 'HH:mm' };
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
    this._picker?.open();
  }

  closePicker(): void {
    this._picker?.close();
  }
}
