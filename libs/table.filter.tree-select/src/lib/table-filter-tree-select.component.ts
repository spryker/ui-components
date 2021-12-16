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
import { TableFilterComponent } from '@spryker/table.feature.filters';
import {
  TableFilterTreeSelect,
  TableFilterTreeSelectValue,
  TableFilterTreeSelectOptionsValue,
} from './types';
import { EMPTY } from 'rxjs';

/**
 * Component represents tree-select filter feature for the main table component
 */
@Component({
  selector: 'spy-table-filter-tree-select',
  templateUrl: './table-filter-tree-select.component.html',
  styleUrls: ['./table-filter-tree-select.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TableFilterTreeSelectComponent
  implements TableFilterComponent<TableFilterTreeSelect>, OnChanges
{
  @Input() config?: TableFilterTreeSelect;
  @Input() value?: TableFilterTreeSelectValue | TableFilterTreeSelectValue[];
  @Output() valueChange = new EventEmitter<
    TableFilterTreeSelectValue | TableFilterTreeSelectValue[]
  >();
  @Output() classes = EMPTY;
  treeSelectOptions: TableFilterTreeSelectOptionsValue[] = [];

  /**
   * Every time config changes provide update to the inner Tree Select Options
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config) {
      this.treeSelectOptions = this.config?.typeOptions?.values || [];
    }
  }
}
