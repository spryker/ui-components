import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { DatasourceModule } from '@spryker/datasource';
import { TableModule } from '@spryker/table';
import {
  MockTableDatasourceConfig,
  MockTableDatasourceService,
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
  col2: `Option ${i}`,
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

export const withTable = (): IStory => ({
  moduleMetadata: {
    imports: [
      HttpClientTestingModule,
      ContextModule,
      TableColumnSelectModule,
      TableModule.forRoot(),
      TableModule.withColumnComponents({
        select: TableColumnSelectComponent,
      } as any),
      DatasourceModule.withDatasources({
        'mock-data': MockTableDatasourceService,
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
      ],
    },
  },
});
