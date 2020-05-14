import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { TableFilterComponent } from '@spryker/table/features';
import { TableFilterDateRange } from './types';
import { DateRangeValueInput } from '@spryker/date-picker';

declare module '@spryker/table/features' {
  interface TableFiltersRegistry {
    dateRange: TableFilterDateRange;
  }
}

@Component({
  selector: 'spy-table-filter-date-range',
  templateUrl: './table-filter-date-range.component.html',
  styleUrls: ['./table-filter-date-range.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TableFilterDateRangeComponent
  implements TableFilterComponent<TableFilterDateRange> {
  @Input() config?: TableFilterDateRange;
  @Input() value?: DateRangeValueInput = {};
  @Output() valueChange = new EventEmitter<DateRangeValueInput>();
}
