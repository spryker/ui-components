import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { IStory } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from '@spryker/table';
import { TableFiltersFeatureModule } from './table-filters-feature.module';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';
import {
  generateMockTableDataFor,
  TableDataMockGenerator,
} from '@spryker/table/testing';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { TableDummyFilterComponent } from '../../testing/src';
import { TableDatasourceHttpService } from '@spryker/table.datasource.http';
import { DefaultContextSerializationModule } from '@spryker/utils';

export default {
  title: 'TableFiltersFeatureComponent',
};

const tableDataGenerator: TableDataMockGenerator = i => ({
  col1: `col1 #${i}`,
  col2: 'col2',
  col3: 'col3',
});

export const viaHtml = getFiltersStory(
  `
    <spy-table [config]="config" [mockHttp]="mockHttp">
      <spy-table-filters-feature spy-table-feature></spy-table-filters-feature>
    </spy-table>
  `,
  [TableFiltersFeatureModule],
);

export const viaConfig = getFiltersStory(
  `
    <spy-table [config]="config" [mockHttp]="mockHttp">
  `,
  [
    TableModule.withFeatures({
      filters: () =>
        import('./table-filters-feature.module').then(
          m => m.TableFiltersFeatureModule,
        ),
    }),
  ],
);

function getFiltersStory(
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
        TableFiltersFeatureModule.withFilterComponents({
          filter: TableDummyFilterComponent,
        } as any),
        DefaultContextSerializationModule,
        TableModule.withDatasourceTypes({
          http: TableDatasourceHttpService,
        }),
        ...extraNgModules,
      ],
      declarations: [TableDummyFilterComponent],
      providers: [
        {
          provide: ANALYZE_FOR_ENTRY_COMPONENTS,
          useValue: [LayoutFlatHostComponent, TableDummyFilterComponent],
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
        filters: {
          enabled: true,
          items: [
            {
              id: 'filter',
              title: 'Filter',
              type: 'filter',
              typeOptions: {
                value: 'This is dummy input filter',
              },
            },
          ],
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
