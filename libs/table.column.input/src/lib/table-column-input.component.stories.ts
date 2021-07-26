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

import { TableColumnInputComponent } from './table-column-input.component';
import { TableColumnInputModule } from './table-column-input.module';

export default {
  title: 'TableColumnInputComponent',
};

const tableDataGenerator: TableDataMockGenerator = (i) => ({
  col1: `col1`,
  col2: `${i}`,
});

export const primary = (): IStory => ({
  moduleMetadata: {
    imports: [
      TableColumnInputModule,
      DefaultContextSerializationModule,
      BrowserAnimationsModule,
    ],
  },
  component: TableColumnInputComponent,
  props: {
    config: object('Config', {}),
    context: object('Context', {
      placeholder: '123',
    }),
  },
});

export const withTable = (): IStory => ({
  moduleMetadata: {
    imports: [
      HttpClientTestingModule,
      ContextModule,
      TableColumnInputModule,
      TableModule.forRoot(),
      TableModule.withColumnComponents({
        input: TableColumnInputComponent,
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
        useValue: [LayoutFlatHostComponent, TableColumnInputComponent],
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
          type: 'input',
          typeOptions: {
            type: 'number',
            attrs: {
              step: 0.05,
            },
          },
        },
      ],
    },
  },
});
