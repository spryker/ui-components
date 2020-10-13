import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { object } from '@storybook/addon-knobs';
import { IStory } from '@storybook/angular';
import { TableColumnSelectComponent } from './table-column-select.component';
import { TableColumnSelectModule } from './table-column-select.module';
import {
  ContextModule,
  DefaultContextSerializationModule,
} from '@spryker/utils';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';
import { TableModule } from '@spryker/table';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import {
  generateMockTableDataFor,
  TableDataMockGenerator,
} from '@spryker/table/testing';
import { TableDatasourceHttpService } from '@spryker/table.datasource.http';

export default {
  title: 'TableColumnSelectComponent',
};

const tableDataGenerator: TableDataMockGenerator = i => ({
  col1: `col1 #${i}`,
  col2: 'col2',
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
        },
      ],
    },
    mockHttp: setMockHttp([
      {
        url: '/data-request',
        dataFn: req => generateMockTableDataFor(req, tableDataGenerator),
      },
    ]),
  },
});
