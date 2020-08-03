import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { IStory } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from '@spryker/table';
import {
  TableFilterSelectComponent,
  TableFilterSelectModule,
  TableFilterDateRangeComponent,
  TableFilterDateRangeModule,
} from '@spryker/table/filters';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';
import {
  generateMockTableDataFor,
  TableDataMockGenerator,
} from '@spryker/table/testing';
import { LayoutFlatHostComponent } from '@orchestrator/layout';

import { TableFiltersFeatureModule } from './table-filters-feature';
import { TablePaginationFeatureModule } from './table-pagination-feature';
import { TableSettingsFeatureModule } from './table-settings-feature';
import { TableRowActionsFeatureModule } from './table-row-actions-feature';
import { TableSearchFeatureModule } from './table-search-feature';
import { TableSelectableFeatureModule } from './table-selectable-feature';
import { TableSyncStateFeatureModule } from './table-sync-state-feature';
import { TableTotalFeatureModule } from './table-total-feature';
import { TableDatasourceHttpService } from '../../datasources/src/table-datasource-http';
import { LocaleModule } from '@spryker/locale';
import { EN_LOCALE, EnLocaleModule } from '@spryker/locale/locales/en';
import { DefaultContextSerializationModule } from '@spryker/utils';
import { TableBatchActionsFeatureModule } from './table-batch-actions-feature';

export default {
  title: 'TableFeaturesComponent',
};

const tableDataGenerator: TableDataMockGenerator = i => ({
  col1: `col1 #${i}`,
  col2: 'col2',
  col3: 'col3',
  col4: 'col4',
  col5: 'col5',
  _actionIds: availableActions(i),
});

const availableActions = (index: number): string[] | undefined => {
  switch (index) {
    case 1:
      return ['update-offer'];
    case 2:
      return ['ship'];
    case 3:
      return [];
    case 4:
      return undefined;
    default:
      return ['update-offer', 'ship'];
  }
};

export const viaHtml = getFeaturesStory(
  `
    <spy-table [config]="config" [mockHttp]="mockHttp">
      <spy-table-filters-feature spy-table-feature></spy-table-filters-feature>
      <spy-table-pagination-feature spy-table-feature></spy-table-pagination-feature>
      <spy-table-row-actions-feature spy-table-feature></spy-table-row-actions-feature>
      <spy-table-search-feature spy-table-feature></spy-table-search-feature>
      <spy-table-selectable-feature spy-table-feature></spy-table-selectable-feature>
      <spy-table-sync-state-feature spy-table-feature></spy-table-sync-state-feature>
      <spy-table-total-feature spy-table-feature></spy-table-total-feature>
      <spy-table-settings-feature spy-table-feature></spy-table-settings-feature>
      <spy-table-batch-actions-feature spy-table-feature></spy-table-batch-actions-feature>
    </spy-table>
  `,
  [
    TableFiltersFeatureModule,
    TablePaginationFeatureModule,
    TableRowActionsFeatureModule,
    TableSearchFeatureModule,
    TableSyncStateFeatureModule,
    TableSelectableFeatureModule,
    TableTotalFeatureModule,
    TableSettingsFeatureModule,
    TableBatchActionsFeatureModule,
  ],
);

export const viaConfig = getFeaturesStory(
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
        import('./table-search-feature').then(m => m.TableSearchFeatureModule),
      syncStateUrl: () =>
        import('./table-sync-state-feature').then(
          m => m.TableSyncStateFeatureModule,
        ),
      total: () =>
        import('./table-total-feature').then(m => m.TableTotalFeatureModule),
      itemSelection: () =>
        import('./table-selectable-feature').then(
          m => m.TableSelectableFeatureModule,
        ),
      settings: () =>
        import('./table-settings-feature').then(
          m => m.TableSettingsFeatureModule,
        ),
      batchActions: () =>
        import('./table-batch-actions-feature').then(
          m => m.TableBatchActionsFeatureModule,
        ),
    }),
  ],
);

function getFeaturesStory(
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
          range: TableFilterDateRangeComponent,
        } as any),
        TableModule.withDatasourceTypes({
          http: TableDatasourceHttpService,
        }),
        TableFilterDateRangeModule,
        TableFilterSelectModule,
        LocaleModule.forRoot({ defaultLocale: EN_LOCALE }),
        EnLocaleModule,
        DefaultContextSerializationModule,
        ...extraNgModules,
      ],
      providers: [
        {
          provide: ANALYZE_FOR_ENTRY_COMPONENTS,
          useValue: [
            LayoutFlatHostComponent,
            TableFilterSelectComponent,
            TableFilterDateRangeComponent,
          ],
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
          { id: 'col1', title: 'Column #1', sortable: true, hideable: true },
          { id: 'col2', title: 'Column #2', hideable: true },
          { id: 'col3', title: 'Column #3', hideable: true },
          { id: 'col4', title: 'Column #4', hideable: true },
          { id: 'col5', title: 'Column #5', hideable: true },
        ],
        batchActions: {
          enabled: true, // This will enable feature via config
          noActionsMessage: 'No available actions for selected rows',
          availableActionsPath: '_actionIds',
          rowIdPath: 'sku',
          actions: [
            {
              id: 'update-offer',
              title: 'Update Offer(s)',
              type: 'form-overlay',
              typeOptions: {
                url: 'https://.../?ids=${rowIds}',
                method: 'GET',
              },
            },
            {
              id: 'ship',
              title: 'Ship',
              type: 'html-overlay',
              typeOptions: {
                url: 'https://.../?ids=${rowIds}',
                method: 'GET',
              },
            },
          ],
        },
        filters: {
          enabled: true,
          items: [
            {
              id: 'select',
              title: 'Select',
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
              title: 'Select',
              type: 'select',
              typeOptions: {
                multiselect: true,
                values: [
                  { value: 1, title: 'Option_1' },
                  { value: 2, title: 'Option_2' },
                  { value: 3, title: 'Option_3' },
                  { value: 4, title: 'Option_4' },
                ],
              },
            },
            {
              id: 'range',
              title: 'Range',
              type: 'range',
              typeOptions: {
                placeholderFrom: 'from',
                format: 'yyyy-MM-dd',
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
        settings: {
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
