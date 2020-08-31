import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { MockHttpModule } from '@spryker/internal-utils';
import { TableModule } from '@spryker/table';
import {
  generateMockTableDataForOptions,
  TableDataMockGenerator,
} from '@spryker/table/testing';
import {
  ContextModule,
  DefaultContextSerializationModule,
} from '@spryker/utils';
import { IStory } from '@storybook/angular';

import { TableDatasourceStaticService } from './table-datasource-static.service';

export default {
  title: 'TableDatasourceStaticService',
};

const tableDataGenerator: TableDataMockGenerator = i => ({
  col1: `col1 #${i}`,
  col2: 'col 2',
  col3: 'col3',
  col4: 'col4',
});

export const withTable = (): IStory => ({
  moduleMetadata: {
    imports: [
      HttpClientTestingModule,
      ContextModule,
      MockHttpModule,
      TableModule.forRoot(),
      TableModule.withDatasourceTypes({
        static: TableDatasourceStaticService,
      }),
      DefaultContextSerializationModule,
      BrowserAnimationsModule,
    ],
    providers: [
      {
        provide: ANALYZE_FOR_ENTRY_COMPONENTS,
        useValue: [LayoutFlatHostComponent],
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
        type: 'static',
        data: [
          {
            col1: `col1 #`,
            col2: 'col 2',
            col3: 'col3',
            col4: 'col4',
          },
        ],
      },
      columns: [
        { id: 'col1', title: 'Column #1', width: '20%' },
        { id: 'col2', title: 'Column #2', width: '20%' },
        { id: 'col3', title: 'Column #3' },
        { id: 'col4', title: 'Column #4' },
      ],
    },
  },
});
