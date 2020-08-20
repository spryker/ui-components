import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';
import { LocaleModule } from '@spryker/locale';
import { EN_LOCALE, EnLocaleModule } from '@spryker/locale/locales/en';
import { NotificationModule } from '@spryker/notification';
import { TableModule } from '@spryker/table';
import { TableDatasourceHttpService } from '@spryker/table.datasource.http';
import { TableBatchActionsFeatureModule } from '@spryker/table.feature.batch-actions';
import { TableFiltersFeatureModule } from '@spryker/table.feature.filters';
import { TablePaginationFeatureModule } from '@spryker/table.feature.pagination';
import { TableRowActionsFeatureModule } from '@spryker/table.feature.row-actions';
import { TableSearchFeatureModule } from '@spryker/table.feature.search';
import { TableSelectableFeatureModule } from '@spryker/table.feature.selectable';
import { TableSettingsFeatureModule } from '@spryker/table.feature.settings';
import { TableSyncStateFeatureModule } from '@spryker/table.feature.sync-state';
import { TableTitleFeatureModule } from '@spryker/table.feature.title';
import { TableTotalFeatureModule } from '@spryker/table.feature.total';
import {
  TableFilterDateRangeComponent,
  TableFilterDateRangeModule,
  TableFilterSelectComponent,
  TableFilterSelectModule,
} from '@spryker/table/filters';
import {
  generateMockTableDataFor,
  TableDataMockGenerator,
} from '@spryker/table/testing';
import { DefaultContextSerializationModule } from '@spryker/utils';
import { IStory } from '@storybook/angular';

import { NotificationWrapperComponent } from '../../../../notification/src/lib/notification-wrapper/notification-wrapper.component';

export default {
  title: 'TableWithFeaturesComponent',
};

const tableDataGenerator: TableDataMockGenerator = i => ({
  col1: `col1 #${i}`,
  col2: 'col2',
  col3: 'col3',
  col4: 'col4',
  col5: 'col5',
  col6: 'col6',
  col7: 'col7',
  col8: 'col8',
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
      <spy-table-title-feature spy-table-feature></spy-table-title-feature>
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
    TableTitleFeatureModule,
  ],
);

export const viaConfig = getFeaturesStory(
  `
    <spy-table [config]="config" [mockHttp]="mockHttp">
  `,
  [
    TableModule.withFeatures({
      filters: () =>
        import('@spryker/table.feature.filters').then(
          m => m.TableFiltersFeatureModule,
        ),
      pagination: () =>
        import('@spryker/table.feature.pagination').then(
          m => m.TablePaginationFeatureModule,
        ),
      rowActions: () =>
        import('@spryker/table.feature.row-actions').then(
          m => m.TableRowActionsFeatureModule,
        ),
      search: () =>
        import('@spryker/table.feature.search').then(
          m => m.TableSearchFeatureModule,
        ),
      syncStateUrl: () =>
        import('@spryker/table.feature.sync-state').then(
          m => m.TableSyncStateFeatureModule,
        ),
      total: () =>
        import('@spryker/table.feature.total').then(
          m => m.TableTotalFeatureModule,
        ),
      itemSelection: () =>
        import('@spryker/table.feature.selectable').then(
          m => m.TableSelectableFeatureModule,
        ),
      settings: () =>
        import('@spryker/table.feature.settings').then(
          m => m.TableSettingsFeatureModule,
        ),
      batchActions: () =>
        import('@spryker/table.feature.batch-actions').then(
          m => m.TableBatchActionsFeatureModule,
        ),
      title: () =>
        import('@spryker/table.feature.title').then(
          m => m.TableTitleFeatureModule,
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
        NotificationModule.forRoot(),
        TableModule.forRoot(),
        TableFiltersFeatureModule.withFilterComponents({
          select: TableFilterSelectComponent,
          'date-range': TableFilterDateRangeComponent,
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
      entryComponents: [NotificationWrapperComponent],
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
          { id: 'col2', title: 'Column #2', hideable: false },
          { id: 'col3', title: 'Column #3', hideable: true },
          { id: 'col4', title: 'Column #4', hideable: true },
          { id: 'col5', title: 'Column #5', hideable: true },
          { id: 'col6', title: 'Column #6', hideable: true },
          { id: 'col7', title: 'Column #7', hideable: true },
          { id: 'col8', title: 'Column #8', hideable: true },
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
              id: 'select3',
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
              type: 'date-range',
              typeOptions: {
                placeholderFrom: 'from',
                format: 'yyyy-MM-dd',
              },
            },
            {
              id: 'range2',
              title: 'Range',
              type: 'date-range',
              typeOptions: {
                placeholderFrom: 'from',
                format: 'yyyy-MM-dd',
              },
            },
            {
              id: 'range2',
              title: 'Range',
              type: 'date-range',
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
        title: {
          title: 'Table title',
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
