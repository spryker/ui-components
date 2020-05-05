import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { IStory } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from '@spryker/table';
import {
  TableFilterSelectComponent,
  TableFilterSelectModule,
} from '@spryker/table/filters';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';
import {
  generateMockTableDataFor,
  TableDataMockGenerator,
} from '@spryker/table/testing';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import { TableFiltersFeatureModule } from './table-filters-feature';
import { TablePaginationFeatureModule } from './table-pagination-feature';
import { TableRowActionsFeatureModule } from './table-row-actions-feature';
import { TableSearchFeatureModule } from './table-search-feature';
import { TableSelectableFeatureModule } from './table-selectable-feature';
import { TableSyncStateFeatureModule } from './table-sync-state-feature';
import { TableTotalFeatureModule } from './table-total-feature';

export default {
  title: 'TableFeaturesComponent',
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
      <spy-table-pagination-feature spy-table-feature></spy-table-pagination-feature>
      <spy-table-row-actions-feature spy-table-feature></spy-table-row-actions-feature>
      <spy-table-search-feature spy-table-feature></spy-table-search-feature>
      <spy-table-selectable-feature spy-table-feature></spy-table-selectable-feature>
      <spy-table-sync-state-feature spy-table-feature></spy-table-sync-state-feature>
      <spy-table-total-feature spy-table-feature></spy-table-total-feature>
    </spy-table>
  `,
  [TableFiltersFeatureModule, TablePaginationFeatureModule, TableRowActionsFeatureModule, TableSearchFeatureModule, TableSyncStateFeatureModule, TableSelectableFeatureModule, TableTotalFeatureModule],
);

export const viaConfig = getFiltersStory(
  `
    <spy-table [config]="config" [mockHttp]="mockHttp">
  `,
  [
    TableModule.withFeatures({
      filters: () =>
        import('./table-filters-feature').then(
          m => m.TableFiltersFeatureModule,
        ),
      pagination: () =>
        import('./table-pagination-feature').then(
          m => m.TablePaginationFeatureModule,
        ),
      rowActions: () =>
        import('./table-row-actions-feature').then(
          m => m.TableRowActionsFeatureModule,
        ),
      search: () =>
        import('./table-search-feature').then(
          m => m.TableSearchFeatureModule,
        ),
      syncStateUrl: () =>
        import('./table-sync-state-feature').then(
          m => m.TableSyncStateFeatureModule,
        ),
      total: () =>
        import('./table-total-feature').then(
          m => m.TableTotalFeatureModule,
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
          select: TableFilterSelectComponent,
        } as any),
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
        dataUrl: '/data-request',
        columns: [
          { id: 'col1', title: 'Column #1' },
          { id: 'col2', title: 'Column #2' },
          { id: 'col3', title: 'Column #3' },
        ],
        filters: {
          enabled: true,
          items: [
            {
              id: 'offers',
              title: 'Has Offers',
              type: 'select',
              typeOptions: {
                multiselect: false,
                values: [
                  { value: 1, title: 'Yes' },
                  { value: 0, title: 'No' },
                ],
              },
            },
          ],
        },
        pagination: {
          enabled: true,
          sizes: [10, 50, 100],
        },
        rowActions: {
          enabled: true,
          actions: [
            { id: '1234', title: '123' },
            { id: '2345', title: '234' },
          ],
        },
        search: {
          enabled: true,
          placeholder: 'Placeholder',
        },
        itemSelection: {
          enabled: true,
        },
        syncStateUrl: {
          enabled: true,
        },
        total: {
          enabled: true,
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
