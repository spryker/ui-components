import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { DatasourceModule } from '@spryker/datasource';
import { TableModule } from '@spryker/table';
import { TableDummyFilterComponent } from '@spryker/table.feature.filters/testing';
import {
  MockTableDatasourceConfig,
  MockTableDatasourceService,
  TableDataMockGenerator,
} from '@spryker/table/testing';
import { DefaultContextSerializationModule } from '@spryker/utils';
import { IStory } from '@storybook/angular';

import { TableFiltersFeatureModule } from './table-filters-feature.module';

export default {
  title: 'TableFiltersFeatureComponent',
};

const tableDataGenerator: TableDataMockGenerator = (i) => ({
  col1: `col1 #${i}`,
  col2: 'col2',
  col3: 'col3',
});

export const viaHtml = getFiltersStory(
  `
    <spy-table [config]="config">
      <spy-table-filters-feature spy-table-feature></spy-table-filters-feature>
    </spy-table>
  `,
  [TableFiltersFeatureModule],
);

export const viaConfig = getFiltersStory(
  `
    <spy-table [config]="config">
  `,
  [
    TableModule.withFeatures({
      filters: () =>
        import('./table-filters-feature.module').then(
          (m) => m.TableFiltersFeatureModule,
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
        TableModule.forRoot(),
        TableFiltersFeatureModule.withFilterComponents({
          filter: TableDummyFilterComponent,
        } as any),
        DefaultContextSerializationModule,
        DatasourceModule.withDatasources({
          'mock-data': MockTableDatasourceService,
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
          type: 'mock-data',
          dataGenerator: tableDataGenerator,
        } as MockTableDatasourceConfig,
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
    },
  });
}
