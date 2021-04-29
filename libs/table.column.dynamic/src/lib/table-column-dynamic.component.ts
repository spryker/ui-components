import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Injectable,
  OnChanges,
  Input,
  Injector,
} from '@angular/core';
import {
  TableColumnComponent,
  TableColumnTypeComponent,
  ColumnTypeOption,
  ColumnTypeOptionsType,
  TableColumnContext,
  TableColumn,
  TableDataRow,
} from '@spryker/table';
import {
  DatasourceConfig,
  DatasourceService,
  DatasourceType,
} from '@spryker/datasource';
import { ContextService, TypedSimpleChanges } from '@spryker/utils';
import { EMPTY, merge, ReplaySubject } from 'rxjs';
import { map, mapTo, switchMap } from 'rxjs/operators';

declare module '@spryker/table' {
  interface TableColumnTypeRegistry {
    dynamic: TableColumnDynamicConfig;
  }
}

@Injectable({ providedIn: 'root' })
export class TableColumnDynamicDatasourceConfig implements DatasourceConfig {
  @ColumnTypeOption({
    required: true,
    type: ColumnTypeOptionsType.TypeOf,
    value: String,
  })
  type!: DatasourceType;
  [k: string]: unknown;
}

@Injectable({ providedIn: 'root' })
export class TableColumnDynamicConfig {
  @ColumnTypeOption({ required: true })
  datasource!: TableColumnDynamicDatasourceConfig;
}

@Component({
  selector: 'spy-table-column-dynamic',
  templateUrl: './table-column-dynamic.component.html',
  styleUrls: ['./table-column-dynamic.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'spy-table-column-dynamic' },
})
@TableColumnTypeComponent(TableColumnDynamicConfig)
export class TableColumnDynamicComponent
  implements TableColumnComponent<TableColumnDynamicConfig>, OnChanges {
  @Input() config?: TableColumnDynamicConfig;
  @Input() context?: TableColumnContext;

  colData?: TableDataRow;

  updateColConfig$ = new ReplaySubject<void>(1);
  colConfig$ = this.updateColConfig$.pipe(
    switchMap(() => {
      if (!this.config || !this.context) {
        return EMPTY;
      }

      return this.datasourceService.resolve<TableColumnDynamicConfig>(
        this.injector,
        this.config.datasource,
        this.context,
      );
    }),
    map((colConfig) => {
      const config = { ...colConfig, id: this.colKey, title: this.colKey };
      return this.interpolateConfigReq(config, this.context);
    }),
  );
  isColConfigLoading$ = merge(
    this.updateColConfig$.pipe(mapTo(true)),
    this.colConfig$.pipe(mapTo(false)),
  );

  private colKey = 'dynamic';

  constructor(
    private injector: Injector,
    private datasourceService: DatasourceService,
    private contextService: ContextService,
  ) {}

  ngOnChanges(changes: TypedSimpleChanges<TableColumnComponent>): void {
    if (changes.config || changes.context) {
      this.updateColConfig$.next();
    }

    if (changes.context) {
      this.updateData();
    }
  }

  private updateData() {
    this.colData = { [this.colKey]: this.context?.value };
  }

  private interpolateConfigReq<T>(config: T, context: any): T {
    switch (typeof config) {
      case 'string':
        return this.contextService.interpolateObj(config, context) as any;
      case 'object':
        return Array.isArray(config)
          ? (config.map((value) =>
              this.interpolateConfigReq(value, context),
            ) as any)
          : Object.entries(config).reduce(
              (acc, [key, value]) => ({
                ...acc,
                [key]: this.interpolateConfigReq(value, context),
              }),
              {} as T,
            );
      default:
        return config;
    }
  }
}
