import { TableDatasourceStaticModule } from '@spryker/table.datasource.static';
import { TableModule } from '@spryker/table';
import { TableDatasourceStaticService } from './table-datasource-static.service';
import { IStory } from '@storybook/angular';
import { MockHttpModule } from '@spryker/internal-utils';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DefaultContextSerializationModule } from '@spryker/utils';

export default {
  title: 'TableDatasourceStaticComponent',
};

export const withTable = (): IStory => ({
  moduleMetadata: {
    imports: [
      HttpClientTestingModule,
      TableDatasourceStaticModule,
      DefaultContextSerializationModule,
      TableModule.forRoot(),
      MockHttpModule,
      TableModule.withDatasourceTypes({
        static: TableDatasourceStaticService,
      }),
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
          {
            col1: `col1.2 #`,
            col2: 'col 2.2',
            col3: 'col3.2',
            col4: 'col4.2',
          },
        ],
      },
      columns: [
        { id: 'col1', title: 'Column #1' },
        { id: 'col2', title: 'Column #2' },
        { id: 'col3', title: 'Column #3' },
        { id: 'col4', title: 'Column #4' },
      ],
    },
  },
});
