import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { IStory } from '@storybook/angular';
import { TableModule } from '@spryker/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TablePaginationFeatureModule } from './table-pagination-feature.module';
import {
  generateMockTableDataFor,
  TableDataMockGenerator,
} from '@spryker/table/testing';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';
import { TableDatasourceHttpService } from '@spryker/table.datasource.http';
import { DefaultContextSerializationModule } from '@spryker/utils';

export default {
  title: 'TablePaginationFeatureComponent',
};

const tableDataGenerator: TableDataMockGenerator = i => ({
  col1: `col1 #${i}`,
  col2: 'col2',
  col3: 'col3',
});

export const viaHtml = getPaginationStory(
  `
    <spy-table [config]="config" [mockHttp]="mockHttp">
      <spy-table-pagination-feature spy-table-feature></spy-table-pagination-feature>
    </spy-table>
  `,
  [TablePaginationFeatureModule],
);

export const viaConfig = getPaginationStory(
  `
    <spy-table [config]="config" [mockHttp]="mockHttp">
  `,
  [
    TableModule.withFeatures({
      pagination: () =>
        import('./table-pagination-feature.module').then(
          m => m.TablePaginationFeatureModule,
        ),
    }),
  ],
);

function getPaginationStory(
  template: string,
  extraNgModules: any[] = [],
): () => IStory {
  return () => ({
    moduleMetadata: {
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MockHttpModule,
        TableModule.forRoot(),
        TableModule.withDatasourceTypes({
          http: TableDatasourceHttpService,
        }),
        DefaultContextSerializationModule,
        ...extraNgModules,
      ],
      providers: [
        {
          provide: ANALYZE_FOR_ENTRY_COMPONENTS,
          useValue: [LayoutFlatHostComponent],
          multi: true,
        },
      ],
    },
    template,
    props: {
      config: {
        dataSource: {
          type: 'http',
          url: '/data-request',
        },
        columns: [
          { id: 'col1', title: 'Column #1' },
          { id: 'col2', title: 'Column #2' },
          { id: 'col3', title: 'Column #3' },
        ],
        pagination: {
          enabled: true, // This will enable feature via config
          sizes: [10, 50, 100],
        },
      },
      mockHttp: setMockHttp([
        {
          url: '/data-request',
          dataFn: req => generateMockTableDataFor(req, tableDataGenerator),
        },
      ]),
    },
  });
}
