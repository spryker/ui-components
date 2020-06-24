import { SelectOptionItem } from '@spryker/select';
import {
  Component,
  ChangeDetectionStrategy,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { TableFilterSelect, TableFilterSelectValue } from './types';
import { TableFilterComponent } from '@spryker/table/features';
import { I18nService } from '@spryker/locale';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

declare module '@spryker/table/features' {
  interface TableFiltersRegistry {
    select: TableFilterSelect;
  }
}

@Component({
  selector: 'spy-table-filter-select',
  templateUrl: './table-filter-select.component.html',
  styleUrls: ['./table-filter-select.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TableFilterSelectComponent
  implements TableFilterComponent<TableFilterSelect>, OnChanges {
  @Input() config?: TableFilterSelect;
  @Input() value?: TableFilterSelectValue;
  @Output() valueChange = new EventEmitter<TableFilterSelectValue>();
  selectOptions: SelectOptionItem[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config) {
      this.selectOptions = this.config?.typeOptions?.values.map(
        ({ value, title: label }) => ({ label, value }),
      ) as SelectOptionItem[];
    }
  }
}
