import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { object } from '@storybook/addon-knobs';
import { IStory } from '@storybook/angular';
import { TableColumnChipComponent } from './table-column-chip.component';
import { TableColumnChipModule } from './table-column-chip.module';
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
  title: 'TableColumnChipComponent',
};

const tableDataGenerator: TableDataMockGenerator = (i) => ({
  col1: `col1 #${i}`,
  col2: Math.random() > 0.5 ? 1 : 0,
  col3: 'col3',
});

export const primary = (): IStory => ({
  moduleMetadata: {
    imports: [TableColumnChipModule, DefaultContextSerializationModule],
  },
  component: TableColumnChipComponent,
  props: {
    config: object('Config', {
      text: '${value}',
      color: 'red',
    }),
    context: object('Context', {
      value: 'Value for testing',
    }),
  },
});

export const withTable = (): IStory => ({
  moduleMetadata: {
    imports: [
      HttpClientTestingModule,
      ContextModule,
      MockHttpModule,
      TableColumnChipModule,
      TableModule.forRoot(),
      TableModule.withColumnComponents({
        chip: TableColumnChipComponent,
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
        useValue: [LayoutFlatHostComponent, TableColumnChipComponent],
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
          type: 'chip',
          sortable: true,
          typeOptions: {
            color: 'grey',
          },
          typeOptionsMappings: {
            color: { 0: 'red' },
          },
        },
        {
          id: 'col3',
          title: 'Column #3',
          type: 'chip',
          typeOptions: {
            text: '${value}',
            color: 'blue',
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
