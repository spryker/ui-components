import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { object } from '@storybook/addon-knobs';
import { IStory } from '@storybook/angular';
import { TableColumnTextComponent } from './table-column-text.component';
import { TableColumnTextModule } from './table-column-text.module';
import { ContextModule } from '@spryker/utils';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';
import { TableModule } from '@spryker/table';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import {
  generateMockTableDataFor,
  TableDataMockGenerator,
} from '@spryker/table/testing';
import { TableDatasourceHttpService } from '../../../datasources/src/table-datasource-http';

export default {
  title: 'TableColumnTextComponent',
};

const tableDataGenerator: TableDataMockGenerator = i => ({
  col1: `col1 #${i}`,
  col2: 'very looooooooooooooooooooooooooooooooooong col',
  col3: 'col3',
  col4: 'col4',
});

export const primary = (): IStory => ({
  moduleMetadata: {
    imports: [TableColumnTextModule],
  },
  component: TableColumnTextComponent,
  props: {
    config: object('Config', {
      text: '${value}',
    }),
    context: object('Context', {
      value: 'Dynamic text',
    }),
  },
});

export const withTable = (): IStory => ({
  moduleMetadata: {
    imports: [
      HttpClientTestingModule,
      ContextModule,
      MockHttpModule,
      TableColumnTextModule,
      TableModule.forRoot(),
      TableModule.withColumnComponents({
        text: TableColumnTextComponent,
      } as any),
      TableModule.withDatasourceTypes({
        http: TableDatasourceHttpService,
      }),
      BrowserAnimationsModule,
    ],
    providers: [
      {
        provide: ANALYZE_FOR_ENTRY_COMPONENTS,
        useValue: [LayoutFlatHostComponent, TableColumnTextComponent],
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
          type: 'text',
          typeOptions: {
            text: '${value}',
          },
        },
        {
          id: 'col3',
          title: 'Column #3',
          type: 'text',
          typeOptions: {
            text: '${value}',
          },
          typeOptionsMappings: {
            color: { col3: 'green' },
          },
        },
        {
          id: 'col4',
          title: 'Column #4',
          type: 'text',
          typeOptions: {
            text: '${value} in ${row.col1}',
          },
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
