import { TableFilterBase } from '@spryker/table/features';
import { DateRangeValueInput } from '@spryker/date-picker';

export interface TableFilterDateRange
  extends TableFilterBase<DateRangeValueInput> {
  type: 'date-range';
  typeOptions: TableFilterDateRangeOptions;
}

export interface TableFilterDateRangeOptions {
  placeholderFrom?: string;
  placeholderTo?: string;
  format?: string;
  time?: string | boolean;
}
