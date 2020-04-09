import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
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
export class TableColumnRendererComponent implements OnInit {
  @Input() config?: TableColumn;
  @Input() data?: TableDataRow;
  @Input() template?: TemplateRef<TableColumnTplContext>;

  itemConfig?: OrchestratorConfigItem;

  value?: unknown;
  context?: TableColumnTplContext;
  emptyValue?: string;
  defaultValue = '-';

  ngOnInit(): void {
    if (this.config) {
      this.emptyValue = this.config.emptyValue || this.defaultValue;
      this.value = this.data?.[this.config.id];
    }

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
