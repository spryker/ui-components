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
import { TableSelectableFeatureModule } from '@spryker/table.feature.selectable';
import {
  generateMockTableDataFor,
  TableDataMockGenerator,
} from '@spryker/table/testing';
import { DefaultContextSerializationModule } from '@spryker/utils';
import { IStory } from '@storybook/angular';

import { NotificationWrapperComponent } from '../../../notification/src/lib/notification-wrapper/notification-wrapper.component';
import { TableBatchActionsFeatureModule } from './table-batch-actions-feature.module';

export default {
  title: 'TableBatchActionsFeatureComponent',
};

const tableDataGenerator: TableDataMockGenerator = (i) => ({
  sku: `sku#${i}`,
  col2: availableActionsTitle(i),
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

const availableActionsTitle = (index: number): string => {
  switch (index) {
    case 1:
      return 'update-offer';
    case 2:
      return 'ship';
    case 3:
      return 'none';
    case 4:
      return 'undefined = both';
    default:
      return 'both';
  }
};

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
          (m) => m.TableBatchActionsFeatureModule,
        ),
      itemSelection: () =>
        import('@spryker/table.feature.selectable').then(
          (m) => m.TableSelectableFeatureModule,
        ),
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
        NotificationModule.forRoot(),
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
          { id: 'sku', title: 'SKU' },
          { id: 'col2', title: 'Available Actions' },
        ],
        itemSelection: {
          enabled: true, // This will enable feature via config
        },
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
      },
      mockHttp: setMockHttp([
        {
          url: '/data-request',
          dataFn: (req) => generateMockTableDataFor(req, tableDataGenerator),
        },
      ]),
    },
  });
}
