import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { IStory } from '@storybook/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MockTableDatasourceConfig,
  MockTableDatasourceService,
  TableDataMockGenerator,
} from '@spryker/table/testing';
import {
  ContextModule,
  DefaultContextSerializationModule,
} from '@spryker/utils';
import { TableModule } from '@spryker/table';
import { DatasourceModule } from '@spryker/datasource';
import {
  TableColumnSelectComponent,
  TableColumnSelectModule,
} from '@spryker/table.column.select';
import {
  TableColumnTextComponent,
  TableColumnTextModule,
} from '@spryker/table.column.text';
import {
  DatasourceInlineModule,
  DatasourceInlineService,
} from '@spryker/datasource.inline';
import { NotificationModule } from '@spryker/notification';
import { LocaleModule } from '@spryker/locale';
import { EN_LOCALE, EnLocaleModule } from '@spryker/locale/locales/en';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { TableColumnDynamicComponent } from './table-column-dynamic.component';
import { TableColumnDynamicModule } from './table-column-dynamic.module';

export default {
  title: 'TableColumnDynamicComponent',
};

const tableDataGenerator: TableDataMockGenerator = (i) => ({
  col1: `${i}`,
  col2: `Option ${i}`,
  col3: `col3 #${i}`,
});

export const primary = (): IStory => ({
  moduleMetadata: {
    imports: [
      HttpClientTestingModule,
      ContextModule,
      TableModule.forRoot(),
      TableModule.withFeatures({
        editable: () =>
          import('@spryker/table.feature.editable').then(
            (m) => m.TableEditableFeatureModule,
          ),
      } as any),
      TableModule.withColumnComponents({
        text: TableColumnTextComponent,
        select: TableColumnSelectComponent,
        dynamic: TableColumnDynamicComponent,
      } as any),
      DatasourceModule.withDatasources({
        'mock-data': MockTableDatasourceService,
        inline: DatasourceInlineService,
      }),
      DefaultContextSerializationModule,
      BrowserAnimationsModule,
      DatasourceInlineModule,
      NotificationModule.forRoot(),
      LocaleModule.forRoot({ defaultLocale: EN_LOCALE }),
      EnLocaleModule,
      TableColumnTextModule,
      TableColumnSelectModule,
      TableColumnDynamicModule,
    ],
    providers: [
      {
        provide: ANALYZE_FOR_ENTRY_COMPONENTS,
        useValue: [
          LayoutFlatHostComponent,
          TableColumnTextComponent,
          TableColumnSelectComponent,
          TableColumnDynamicComponent,
        ],
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
            datasource: {
              type: 'inline',
              data: {
                type: 'select',
                typeOptions: {
                  options: [
                    {
                      title: 'Option dynamic 1',
                      value: 'Option dynamic 1',
                    },
                    {
                      title: 'Option dynamic 2',
                      value: 'Option dynamic 2',
                    },
                  ],
                },
              },
            },
          },
        },
      ],
      editable: {
        columns: [
          {
            id: 'col2',
            type: 'select',
            typeOptions: {
              options: ['Option 1', 'Option 2'],
            },
          },
          {
            id: 'col3',
            type: 'dynamic',
            typeOptions: {
              datasource: {
                type: 'inline',
                data: {
                  type: 'select',
                  typeOptions: {
                    options: [
                      {
                        title: 'Option dynamic 1',
                        value: 'Option dynamic 1',
                      },
                      {
                        title: 'Option dynamic 2',
                        value: 'Option dynamic 2',
                      },
                    ],
                  },
                },
              },
            },
          },
        ],
        create: {
          addButton: {},
          cancelButton: {},
        },
      },
    },
  },
});
