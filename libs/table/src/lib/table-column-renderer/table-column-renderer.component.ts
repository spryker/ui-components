import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { OrchestratorConfigItem } from '@orchestrator/core';

import {
  TableColumn,
  TableColumnTplContext,
  TableColumnTypeDef,
  TableDataRow,
} from '../table/table';

@Component({
  selector: 'spy-table-column-renderer',
  templateUrl: './table-column-renderer.component.html',
  styleUrls: ['./table-column-renderer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TableColumnRendererComponent implements OnChanges {
  @Input() config?: TableColumn;
  @Input() data?: TableDataRow;
  @Input() template?: TemplateRef<TableColumnTplContext>;
  @Input() i?: number;

  itemConfig?: OrchestratorConfigItem;

  value?: unknown;
  isValueUndefined?: boolean;
  context?: TableColumnTplContext;
  emptyValue?: string;
  defaultEmptyValue = '-';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config || changes.data) {
      this.updateValues();
    } else if (changes.i) {
      this.updateTplContext();
    }
  }

  private updateValues() {
    if (!this.config) {
      return;
    }

    this.emptyValue = this.config.emptyValue || this.defaultEmptyValue;
    this.value = this.data?.[this.config.id];
    this.isValueUndefined = this.value === undefined || this.value === null;

    this.updateTplContext();
    this.updateItemConfig();
  }

  private updateTplContext(): void {
    if (!this.config) {
      return;
    }

    this.context = {
      $implicit: this.value,
      config: this.config,
      row: this.data || {},
      value: this.value,
      // tslint:disable-next-line: no-non-null-assertion
      i: this.i!,
    };
  }

  private updateItemConfig(): void {
    if (!this.config || !this.config.type) {
      this.itemConfig = undefined;

      return;
    }

    this.itemConfig = this.mapConfig(this.config as TableColumnTypeDef);
  }

  private mapConfig(config: TableColumnTypeDef): OrchestratorConfigItem {
    return {
      component: config.type,
      config: config.typeOptions,
      items: config.children?.map(c => this.mapConfig(c)),
    };
  }
}
