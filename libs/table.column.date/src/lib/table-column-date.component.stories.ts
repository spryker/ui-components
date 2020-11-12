import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { object } from '@storybook/addon-knobs';
import { IStory } from '@storybook/angular';
import { TableColumnDateComponent } from './table-column-date.component';
import { TableColumnDateModule } from './table-column-date.module';
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
  title: 'TableColumnDateComponent',
};

const tableDataGenerator: TableDataMockGenerator = (i) => ({
  col1: `col1 #${i}`,
  col2: new Date('2020-01-01T17:25:00'),
  col3: new Date('2020-01-01T17:25:00'),
});

export const primary = (): IStory => ({
  moduleMetadata: {
    imports: [TableColumnDateModule, DefaultContextSerializationModule],
  },
  component: TableColumnDateComponent,
  props: {
    config: object('Config', {
      date: '${value}',
      format: 'mediumDate',
    }),
    context: object('Context', {
      value: new Date('2020-01-01T17:25:00'),
    }),
  },
});

export const withTable = (): IStory => ({
  moduleMetadata: {
    imports: [
      HttpClientTestingModule,
      ContextModule,
      MockHttpModule,
      TableColumnDateModule,
      TableModule.forRoot(),
      TableModule.withColumnComponents({
        date: TableColumnDateComponent,
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
        useValue: [LayoutFlatHostComponent, TableColumnDateComponent],
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
        { id: 'col1', sortable: true, title: 'Column #1', width: '20%' },
        {
          id: 'col2',
          title: 'Column #2',
          type: 'date',
          typeOptions: {
            date: '${value}',
            format: 'mediumDate',
          },
        },
        {
          id: 'col3',
          title: 'Column #3',
          type: 'date',
          typeOptions: {
            date: '${value}',
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
