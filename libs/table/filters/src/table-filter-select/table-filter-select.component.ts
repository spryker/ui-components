import { SelectOptionItem } from '@spryker/select';
import {
  Component,
  ChangeDetectionStrategy,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  SimpleChanges
} from '@angular/core';
import { TableFilterSelect, TableFilterSelectValues } from './table-filter-select';
import { TableFilterComponent } from '@spryker/table/features';

declare module '@spryker/table/features' {
  interface TableFiltersRegistry {
    select: TableFilterSelect;
  }
}

@Component({
  selector: 'spy-table-filter-select',
  templateUrl: './table-filter-select.component.html',
  styleUrls: ['./table-filter-select.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableFilterSelectComponent implements TableFilterComponent<TableFilterSelect>, OnChanges {
  @Input() config?: TableFilterSelect;
  @Input() value?: TableFilterSelectValues;
  @Output() valueChange = new EventEmitter<TableFilterSelectValues>();
  selectOptions: SelectOptionItem[] = [];
  selectMultiple?: boolean;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config) {
      this.selectOptions = this.config?.typeOptions.values.map(({ value, title: label }) => ({ label, value })) as SelectOptionItem[];
      this.selectMultiple = this.config?.typeOptions?.multiple;
    }
  }
}
