import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ANALYZE_FOR_ENTRY_COMPONENTS,
  Component,
  Injectable,
  Input,
  NgModule,
  OnChanges,
} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { DatasourceModule } from '@spryker/datasource';
import { DatasourceHttpService } from '@spryker/datasource.http';
import { DatasourceInlineService } from '@spryker/datasource.inline';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';
import { LocaleModule } from '@spryker/locale';
import { EN_LOCALE, EnLocaleModule } from '@spryker/locale/locales/en';
import { NotificationModule } from '@spryker/notification';
import {
  ColumnTypeOption,
  ColumnTypeOptionsType,
  TableColumn,
  TableColumnComponent,
  TableColumnContext,
  TableColumnType,
  TableColumnTypeComponent,
  TableColumnTypeOptions,
  TableDataRow,
  TableModule,
} from '@spryker/table';
import { TableDatasourceDependableService } from '@spryker/table.feature.editable';
import {
  TableColumnTextComponent,
  TableColumnTextModule,
} from '@spryker/table.column.text';
import {
  TableColumnChipComponent,
  TableColumnChipModule,
} from '@spryker/table.column.chip';
import {
  generateMockTableDataFor,
  MockTableDatasourceConfig,
  MockTableDatasourceService,
  TableDataMockGenerator,
} from '@spryker/table/testing';
import {
  ContextModule,
  ContextService,
  DefaultContextSerializationModule,
  TypedSimpleChanges,
} from '@spryker/utils';
import { object } from '@storybook/addon-knobs';
import { IStory } from '@storybook/angular';

import { TableColumnSelectComponent } from './table-column-select.component';
import { TableColumnSelectModule } from './table-column-select.module';
import { CommonModule } from '@angular/common';

export default {
  title: 'TableColumnSelectComponent',
};

const tableDataGenerator: TableDataMockGenerator = (i) => ({
  col1: `${i}`,
  col2: `Option ${i}`,
  col3: `col3 #${i}`,
  _col3_Type: i % 2 ? 'text' : 'chip',
  _col3_TypeOptions: i % 2 ? {} : { color: `grey` },
});

export const primary = (): IStory => ({
  moduleMetadata: {
    imports: [
      DatasourceModule.withDatasources({
        'mock-data': MockTableDatasourceService,
      }),
      TableColumnSelectModule,
      DefaultContextSerializationModule,
      BrowserAnimationsModule,
    ],
  },
  component: TableColumnSelectComponent,
  props: {
    config: object('Config', {
      options: [
        'Option 1',
        'Option 2',
        'Option 3',
        'Option 4',
        'Option 5',
        'Option 6',
        'Option 7',
        'Option 8',
        'Option 9',
        'Option 10',
      ],
      placeholder: '123',
    }),
    context: object('Context', {
      value: ['Option 1'],
    }),
  },
});

@Injectable({ providedIn: 'root' })
class TableColumnDynamicConfig {
  @ColumnTypeOption({
    required: true,
    type: ColumnTypeOptionsType.TypeOf,
    value: String,
  })
  type!: TableColumnType;
  @ColumnTypeOption()
  typeOptions?: TableColumnTypeOptions;
}

@Component({
  selector: 'spy-table-column-dynamic',
  template: `
    {{ colConfig | json }}
    <spy-table-column-renderer
      [config]="colConfig"
      [data]="colData"
      [i]="context?.i"
      [j]="context?.j"
    ></spy-table-column-renderer>
  `,
})
@TableColumnTypeComponent(TableColumnDynamicConfig)
class TableColumnDynamicComponent
  implements TableColumnComponent<TableColumnDynamicConfig>, OnChanges {
  @Input() config?: TableColumnDynamicConfig;
  @Input() context?: TableColumnContext;

  colConfig?: TableColumn;
  colData?: TableDataRow;

  private colKey = 'dynamic';

  constructor(private contextService: ContextService) {}

  ngOnChanges(changes: TypedSimpleChanges<TableColumnComponent>): void {
    if (changes.config || changes.context) {
      this.updateConfig();
    }

    if (changes.context) {
      this.updateData();
    }
  }

  private updateConfig() {
    if (!this.config || !this.context) {
      this.colConfig = undefined;
      return;
    }

    const config = { ...this.config, id: this.colKey, title: this.colKey };
    this.colConfig = this.interpolateConfigReq(config, this.context);
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

@NgModule({
  imports: [CommonModule, TableModule],
  exports: [TableColumnDynamicComponent],
  declarations: [TableColumnDynamicComponent],
  entryComponents: [TableColumnDynamicComponent],
})
class TableColumnDynamicModule {}

export const withTable = (): IStory => ({
  moduleMetadata: {
    imports: [
      HttpClientTestingModule,
      ContextModule,
      TableColumnSelectModule,
      TableModule.forRoot(),
      TableModule.withColumnComponents({
        text: TableColumnTextComponent,
        chip: TableColumnChipComponent,
        select: TableColumnSelectComponent,
        dynamic: TableColumnDynamicComponent,
      } as any),
      DatasourceModule.withDatasources({
        'mock-data': MockTableDatasourceService,
      }),
      DefaultContextSerializationModule,
      BrowserAnimationsModule,
      TableColumnDynamicModule,
      TableColumnTextModule,
      TableColumnChipModule,
    ],
    providers: [
      {
        provide: ANALYZE_FOR_ENTRY_COMPONENTS,
        useValue: [LayoutFlatHostComponent, TableColumnSelectComponent],
        multi: true,
      },
    ],
  },
  template: `
    <spy-table [config]="config"></spy-table>
  `,
  props: {
    config: {
      dataSource: {
        type: 'mock-data',
        dataGenerator: tableDataGenerator,
      } as MockTableDatasourceConfig,
      columns: [
        { id: 'col1', sortable: true, title: 'Column #1' },
        {
          id: 'col2',
          title: 'Column #2',
          type: 'select',
          typeOptions: {
            options: [
              {
                title: 'Option 1',
                value: 'Option 1',
              },
              {
                title: 'Option 2',
                value: 'Option 2',
                isDisabled: true,
              },
              {
                title: 'Option 3',
                value: 'Option 3',
              },
            ],
            placeholder: '123',
          },
        },
        {
          id: 'col3',
          title: 'Column #3',
          type: 'dynamic',
          typeOptions: {
            type: '${row._col3_Type}',
            typeOptions: '${row._col3_TypeOptions}',
          },
        },
      ],
    },
  },
});

export const withInlineDependentColumns = (): IStory => ({
  moduleMetadata: {
    imports: [
      HttpClientTestingModule,
      ContextModule,
      MockHttpModule,
      TableColumnSelectModule,
      TableModule.forRoot(),
      TableModule.withFeatures({
        editable: () =>
          import('@spryker/table.feature.editable').then(
            (m) => m.TableEditableFeatureModule,
          ),
      }),
      TableModule.withColumnComponents({
        select: TableColumnSelectComponent,
      } as any),
      DatasourceModule.withDatasources({
        'mock-data': MockTableDatasourceService,
        inline: DatasourceInlineService,
        dependable: TableDatasourceDependableService,
      }),
      DefaultContextSerializationModule,
      BrowserAnimationsModule,
      NotificationModule.forRoot(),
      LocaleModule.forRoot({ defaultLocale: EN_LOCALE }),
      EnLocaleModule,
    ],
    providers: [
      {
        provide: ANALYZE_FOR_ENTRY_COMPONENTS,
        useValue: [LayoutFlatHostComponent, TableColumnSelectComponent],
        multi: true,
      },
    ],
  },
  template: `
    <spy-table [config]="config" [mockHttp]="mockHttp"></spy-table>
  `,
  props: {
    config: {
      dataSource: {
        type: 'mock-data',
        dataGenerator: tableDataGenerator,
      } as MockTableDatasourceConfig,
      columns: [
        { id: 'col1', sortable: true, title: 'Column #1' },
        {
          id: 'col2',
          title: 'Column #2',
        },
        {
          id: 'col3',
          title: 'Column #3',
        },
      ],
      editable: {
        columns: [
          {
            id: 'col2',
            type: 'select',
            typeOptions: {
              datasource: {
                type: 'dependable',
                dependsOn: 'col3',
                datasource: {
                  type: 'inline',
                  data: ['Inline 1', 'Inline 2'],
                },
              },
            },
          },
          {
            id: 'col3',
            type: 'select',
            typeOptions: {
              options: ['Option 1', 'Option 2'],
            },
          },
        ],
        create: {},
        update: { url: '/update-cell' },
      },
    },
    mockHttp: setMockHttp([
      {
        url: '/data-request',
        dataFn: (req) => generateMockTableDataFor(req, tableDataGenerator),
      },
      {
        url: '/update-cell',
        data: {},
      },
    ]),
  },
});

export const withHttpDependentColumns = (): IStory => ({
  moduleMetadata: {
    imports: [
      HttpClientTestingModule,
      ContextModule,
      MockHttpModule,
      TableColumnSelectModule,
      TableModule.forRoot(),
      TableModule.withFeatures({
        editable: () =>
          import('@spryker/table.feature.editable').then(
            (m) => m.TableEditableFeatureModule,
          ),
      }),
      TableModule.withColumnComponents({
        select: TableColumnSelectComponent,
      } as any),
      DatasourceModule.withDatasources({
        'mock-data': MockTableDatasourceService,
        http: DatasourceHttpService,
        dependable: TableDatasourceDependableService,
      }),
      DefaultContextSerializationModule,
      BrowserAnimationsModule,
      NotificationModule.forRoot(),
      LocaleModule.forRoot({ defaultLocale: EN_LOCALE }),
      EnLocaleModule,
    ],
    providers: [
      {
        provide: ANALYZE_FOR_ENTRY_COMPONENTS,
        useValue: [LayoutFlatHostComponent, TableColumnSelectComponent],
        multi: true,
      },
    ],
  },
  template: `
    <spy-table [config]="config" [mockHttp]="mockHttp"></spy-table>
  `,
  props: {
    config: {
      dataSource: {
        type: 'mock-data',
        dataGenerator: tableDataGenerator,
      } as MockTableDatasourceConfig,
      columns: [
        {
          id: 'col1',
          sortable: true,
          title: 'Column #1',
        },
        {
          id: 'col2',
          title: 'Column #2',
        },
        {
          id: 'col3',
          title: 'Column #3',
        },
      ],
      editable: {
        columns: [
          {
            id: 'col2',
            type: 'select',
            typeOptions: {
              datasource: {
                type: 'dependable',
                dependsOn: 'col1',
                datasource: {
                  type: 'http',
                  url: '/data-request-2',
                },
              },
            },
          },
          {
            id: 'col3',
            type: 'select',
            typeOptions: {
              options: ['Option 1', 'Option 2'],
            },
          },
        ],
        create: {},
        update: { url: '/update-cell' },
      },
    },
    mockHttp: setMockHttp([
      {
        url: '/data-request',
        dataFn: (req) => generateMockTableDataFor(req, tableDataGenerator),
      },
      {
        url: '/update-cell',
        data: {},
      },
    ]),
  },
});
