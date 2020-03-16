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

  values: unknown[] = [];
  contexts: TableColumnTplContext[] = [];

  ngOnInit(): void {
    this.updateValues();
    this.updateTplContext();
    this.updateItemConfig();
  }

  private updateValues() {
    if (!this.config) {
      return;
    }

    const data = this.data?.[this.config.id];

    if (this.config?.multiple && Array.isArray(data)) {
      this.values = data;

      return;
    }

    this.values = [data];
  }

  private updateTplContext() {
    if (!this.config) {
      return;
    }

    this.contexts = this.values.map(value => ({
      $implicit: value,
      // tslint:disable-next-line: no-non-null-assertion
      id: this.config!.id,
      row: this.data || {},
      value: value,
    }));
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
