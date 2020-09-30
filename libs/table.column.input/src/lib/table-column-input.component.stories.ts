import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { object } from '@storybook/addon-knobs';
import { IStory } from '@storybook/angular';
import { TableColumnInputComponent } from './table-column-input.component';
import { TableColumnInputModule } from './table-column-input.module';
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
  title: 'TableColumnInputComponent',
};

const tableDataGenerator: TableDataMockGenerator = i => ({
  col1: `col1 #${i}`,
  col2: 'col2',
});

export const primary = (): IStory => ({
  moduleMetadata: {
    imports: [TableColumnInputModule, DefaultContextSerializationModule],
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
      MockHttpModule,
      TableColumnInputModule,
      TableModule.forRoot(),
      TableModule.withColumnComponents({
        input: TableColumnInputComponent,
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
        useValue: [LayoutFlatHostComponent, TableColumnInputComponent],
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
          type: 'input',
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
