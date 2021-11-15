import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS, Component, Input } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { DatasourceModule } from '@spryker/datasource';
import { LocaleModule } from '@spryker/locale';
import { EN_LOCALE, EnLocaleModule } from '@spryker/locale/locales/en';
import {
  NotificationModule,
  NotificationWrapperComponent,
} from '@spryker/notification';
import { TableModule } from '@spryker/table';
import { TableSelectableFeatureModule } from '@spryker/table.feature.selectable';
import {
  MockTableDatasourceConfig,
  MockTableDatasourceService,
  TableDataMockGenerator,
} from '@spryker/table/testing';
import { DefaultContextSerializationModule } from '@spryker/utils';
import { DrawerModule, DrawerContainerProxyComponent } from '@spryker/drawer';
import { ActionsModule } from '@spryker/actions';
import {
  DrawerActionHandlerService,
  DrawerActionModule,
} from '@spryker/actions.drawer';
import { IStory } from '@storybook/angular';
import { TableBatchActionsFeatureModule } from './table-batch-actions-feature.module';

export default {
  title: 'TableBatchActionsFeatureComponent',
};

@Component({
  selector: 'spy-simple-component',
  template: `
    <div>
      Simple Component #{{ randomValue }} <br />
      Projected input value - {{ test }}
    </div>
  `,
})
class SimpleComponent {
  @Input() test?: string;

  randomValue = Math.floor(Math.random() * 100);
}

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
    <spy-table [config]="config">
      <spy-table-batch-actions-feature spy-table-feature></spy-table-batch-actions-feature>
      <spy-table-selectable-feature spy-table-feature></spy-table-selectable-feature>
    </spy-table>
  `,
  [TableBatchActionsFeatureModule, TableSelectableFeatureModule],
);

export const viaConfig = getTotalStory(
  `
    <spy-table [config]="config">
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
        NotificationModule.forRoot(),
        TableModule.forRoot(),
        DrawerModule,
        ActionsModule.withActions({
          drawer: DrawerActionHandlerService,
        }),
        DatasourceModule.withDatasources({
          'mock-data': MockTableDatasourceService,
        }),
        DrawerActionModule.withComponents({
          simple_component: SimpleComponent,
        }),
        LocaleModule.forRoot({ defaultLocale: EN_LOCALE }),
        EnLocaleModule,
        DefaultContextSerializationModule,
        ...extraNgModules,
      ],
      declarations: [SimpleComponent],
      providers: [
        {
          provide: ANALYZE_FOR_ENTRY_COMPONENTS,
          useValue: [LayoutFlatHostComponent],
          multi: true,
        },
      ],
      entryComponents: [
        NotificationWrapperComponent,
        DrawerContainerProxyComponent,
        SimpleComponent,
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
              type: 'drawer',
              component: 'simple_component',
              options: {
                inputs: {
                  action: 'https://.../?ids=${rowIds}',
                  method: 'POST',
                },
              },
            },
            {
              id: 'ship',
              title: 'Ship',
              type: 'drawer',
              component: 'simple_component',
              options: {
                inputs: {
                  action: 'https://.../?ids=${rowIds}',
                  method: 'POST',
                },
              },
            },
          ],
        },
      },
    },
  });
}
