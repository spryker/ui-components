import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';
import { TableModule } from '@spryker/table';
import {
  generateMockTableDataFor,
  TableDataMockGenerator,
} from '@spryker/table/testing';
import { IStory } from '@storybook/angular';
import { DefaultContextSerializationModule } from '@spryker/utils';

import { TableBatchActionsFeatureModule } from './table-batch-actions-feature.module';
import { TableDatasourceHttpService } from '../../../datasources/src/table-datasource-http';
import { LocaleModule } from '@spryker/locale';
import { EN_LOCALE, EnLocaleModule } from '@spryker/locale/locales/en';
import { TableSelectableFeatureModule } from '../table-selectable-feature';

export default {
  title: 'TableBatchActionsFeatureComponent',
};

const tableDataGenerator: TableDataMockGenerator = i => ({
  sku: `sku#${i}`,
  col2: 'col2',
  col3: 'col3',
  _actionIds: i % 2 === 0 ? ['update-offer'] : ['ship'],
});

export const viaHtml = getTotalStory(
  `
    <spy-table [config]="config" [mockHttp]="mockHttp">
      <spy-table-batch-actions-feature spy-table-feature></spy-table-batch-actions-feature>
      <spy-table-selectable-feature spy-table-feature></spy-table-selectable-feature>
    </spy-table>
  `,
  [TableBatchActionsFeatureModule, TableSelectableFeatureModule],
);

export const viaConfig = getTotalStory(
  `
    <spy-table [config]="config" [mockHttp]="mockHttp">
  `,
  [
    TableModule.withFeatures({
      batchActions: () =>
        import('./table-batch-actions-feature.module').then(
          m => m.TableBatchActionsFeatureModule,
        ),
      itemSelection: () =>
        import(
          '../table-selectable-feature/table-selectable-feature.module'
        ).then(m => m.TableSelectableFeatureModule),
    }),
  ],
);

function getTotalStory(
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
        LocaleModule.forRoot({ defaultLocale: EN_LOCALE }),
        EnLocaleModule,
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
          { id: 'sku', title: 'SKU' },
          { id: 'col2', title: 'Column #2' },
          { id: 'col3', title: 'Column #3' },
        ],
        itemSelection: {
          enabled: true, // This will enable feature via config
        },
        batchActions: {
          enabled: true, // This will enable feature via config
          noActionsMessage: 'No available actions for selected rows',
          availableActionsPath: '_actionIds', // Array<ACTION_ID>
          rowIdPath: 'sku',
          actions: [
            {
              id: 'update-offer',
              title: 'Update Offer(s)',
              type: 'form-overlay',
              typeOptions: {
                url: 'https://.../?ids=${rowIds}', // ids=[sku1,sku2,...]
                method: 'GET',
              },
            },
            {
              id: 'ship',
              title: 'Ship',
              type: 'html-overlay',
              typeOptions: {
                url: 'https://.../?ids=${rowIds}', // ids=[sku1,sku2,...]
                method: 'GET',
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
