import { TableFilterBase } from '@spryker/table.feature.filters';
import { DateRangeValueInput } from '@spryker/date-picker';

declare module '@spryker/table.feature.filters' {
  interface TableFiltersRegistry {
    dateRange: TableFilterDateRange;
  }
}

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
