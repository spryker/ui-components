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
import { ContextService } from '@spryker/utils';

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

  constructor(private contextService: ContextService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config || changes.data) {
      this.updateValues();
    } else if (changes.i) {
      this.updateTplContext();
    }
  }

  private updateValues(): void {
    if (!this.config) {
      return;
    }

    this.emptyValue = this.config.emptyValue || this.defaultEmptyValue;
    this.value = this.data?.[this.config.id];
    this.isValueUndefined = this.value === undefined || this.value === null;

    this.updateTplContext();
    this.updateConfig();
    this.updateItemConfig();
  }

  private updateConfig(): void {
    this.config = this.mapConfig(this.config);

    if (this.context && this.config) {
      this.context.config = this.config;
    }
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

    this.itemConfig = this.configColumnToItem(
      this.config as TableColumnTypeDef,
    );
  }

  private mapConfig(config?: TableColumn): TableColumn | undefined {
    if (!config) {
      return;
    }

    return this.mapConfigChildren(config);
  }

  private mapConfigChildren<T extends TableColumnTypeDef>(config: T): T {
    let { typeOptions } = config;

    if (config.typeOptionsMappings) {
      typeOptions = Object.entries(config.typeOptionsMappings).reduce(
        (mapOptions, [mapKey, mapOption]) => {
          const matchedValue = mapOption[String(this.value)];

          if (matchedValue) {
            this.contextService.interpolate(matchedValue, this.context as any);

            return { ...mapOptions, [mapKey]: matchedValue };
          }

          return mapOptions;
        },
        typeOptions,
      );
    }

    // tslint:disable-next-line: no-non-null-assertion
    const children = config.children?.map(c => this.mapConfigChildren(c)!);

    return { ...config, typeOptions, children };
  }

  private configColumnToItem(
    config: TableColumnTypeDef,
  ): OrchestratorConfigItem {
    return {
      component: config.type || '',
      config: config.typeOptions,
      items: config.children?.map(c => this.configColumnToItem(c)),
    };
  }
}
