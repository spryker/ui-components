import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { IStory } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from '@spryker/table';
import { TableFiltersFeatureModule } from '@spryker/table/features';
import { TableFilterSelectComponent, TableFilterSelectModule } from './index';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';
import {
  generateMockTableDataFor,
  TableDataMockGenerator,
} from '@spryker/table/testing';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { TableDatasourceHttpService } from '../../../datasources/src/table-datasource-http';

export default {
  title: 'TableFiltersSelectComponent',
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
        import('@spryker/table/features').then(
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
          select: TableFilterSelectComponent as any,
        }),
        TableModule.withDatasourceTypes({
          http: TableDatasourceHttpService,
        }),
        TableFilterSelectModule,
        ...extraNgModules,
      ],
      providers: [
        {
          provide: ANALYZE_FOR_ENTRY_COMPONENTS,
          useValue: [LayoutFlatHostComponent, TableFilterSelectComponent],
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
          enabled: true, // This will enable feature via config
          items: [
            {
              id: 'select1',
              title: 'Select 1',
              type: 'select',
              typeOptions: {
                multiselect: false,
                values: [
                  { value: 1, title: 'Option_1' },
                  { value: 0, title: 'Option_2' },
                ],
              },
            },
            {
              id: 'select2',
              title: 'Select 2',
              type: 'select',
              typeOptions: {
                multiselect: false,
                values: [
                  { value: 1, title: 'Option_1' },
                  { value: 0, title: 'Option_2' },
                ],
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
