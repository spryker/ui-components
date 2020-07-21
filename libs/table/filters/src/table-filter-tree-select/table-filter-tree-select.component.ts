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
import { TableFilterComponent } from '@spryker/table/features';
import { TableFilterTreeSelect, TableFilterTreeSelectValue } from './types';
import { TreeSelectItem } from '@spryker/tree-select';

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
  implements TableFilterComponent<TableFilterTreeSelect>, OnChanges {
  @Input() config?: TableFilterTreeSelect;
  @Input() value?: TableFilterTreeSelectValue;
  @Output() valueChange = new EventEmitter<TableFilterTreeSelectValue>();
  treeSelectOptions: TreeSelectItem[] = [];

  /**
   * Every time config changes provide update to the inner Tree Select Options
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config) {
      this.treeSelectOptions = this.config?.typeOptions
        ?.values as TreeSelectItem[];
    }
  }
}
