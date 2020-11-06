export interface DateRangeValueInput {
  from?: Date | string;
  to?: Date | string;
}

export interface DateRangeValue {
  from?: Date;
  to?: Date;
}

export interface TimeRangeValueInput {
  onlyWorkHours?: boolean;
  from?: Date | string;
  to?: Date | string;
}
