import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';
import { NotificationModule } from '@spryker/notification';
import { TableModule } from '@spryker/table';
import { TableDatasourceHttpService } from '@spryker/table.datasource.http';
import { TableDatasourceInlineService } from '@spryker/table.datasource.inline';
import { TableDependableDatasourceService } from '@spryker/table.feature.editable';
import {
  generateMockTableDataFor,
  TableDataMockGenerator,
} from '@spryker/table/testing';
import {
  ContextModule,
  DefaultContextSerializationModule,
} from '@spryker/utils';
import { object } from '@storybook/addon-knobs';
import { IStory } from '@storybook/angular';

import { TableColumnSelectComponent } from './table-column-select.component';
import { TableColumnSelectModule } from './table-column-select.module';

export default {
  title: 'TableColumnSelectComponent',
};

const tableDataGenerator: TableDataMockGenerator = (i) => ({
  col1: `col1 #${i}`,
  col2: 'col2',
  col3: 'col3',
});

export const primary = (): IStory => ({
  moduleMetadata: {
    imports: [
      TableColumnSelectModule,
      DefaultContextSerializationModule,
      BrowserAnimationsModule,
    ],
  },
  component: TableColumnSelectComponent,
  props: {
    config: object('Config', {}),
    context: object('Context', {
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
  },
});

export const withTable = (): IStory => ({
  moduleMetadata: {
    imports: [
      HttpClientTestingModule,
      ContextModule,
      MockHttpModule,
      TableColumnSelectModule,
      TableModule.forRoot(),
      TableModule.withColumnComponents({
        select: TableColumnSelectComponent,
      } as any),
      TableModule.withDatasourceTypes({
        http: TableDatasourceHttpService,
      }),
      DefaultContextSerializationModule,
      BrowserAnimationsModule,
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
        type: 'http',
        url: '/data-request',
      },
      columns: [
        { id: 'col1', sortable: true, title: 'Column #1' },
        {
          id: 'col2',
          title: 'Column #2',
          type: 'select',
          typeOptions: {
            options: ['Option 1', 'Option 2'],
          },
        },
      ],
    },
    mockHttp: setMockHttp([
      {
        url: '/data-request',
        dataFn: (req) => generateMockTableDataFor(req, tableDataGenerator),
      },
    ]),
  },
});

export const withDependentColumns = (): IStory => ({
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
      TableModule.withDatasourceTypes({
        http: TableDatasourceHttpService,
        inline: TableDatasourceInlineService,
        dependable: TableDependableDatasourceService,
      }),
      DefaultContextSerializationModule,
      BrowserAnimationsModule,
      NotificationModule.forRoot(),
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
        type: 'http',
        url: '/data-request',
      },
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
