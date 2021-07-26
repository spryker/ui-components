import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { DatasourceModule } from '@spryker/datasource';
import { TableActionTriggeredEvent, TableModule } from '@spryker/table';
import {
  MockTableDatasourceConfig,
  MockTableDatasourceService,
  TableDataMockGenerator,
} from '@spryker/table/testing';
import { DefaultContextSerializationModule } from '@spryker/utils';
import { IStory } from '@storybook/angular';

import { TableRowActionsFeatureModule } from './table-row-actions-feature.module';

export default {
  title: 'TableRowActionsFeatureComponent',
};

const tableDataGenerator: TableDataMockGenerator = (i) => ({
  col1: `col1 #${i}`,
  col2: 'col2',
  col3: 'col3',
  availableActions: i % 2 === 0 ? ['add', 'edit', 'delete'] : undefined,
});

export const viaHtml = getRowActionsStory(
  `
    <spy-table [config]="config" [events]="{rowActions: logActionTriggered}">
      <spy-table-row-actions-feature spy-table-feature></spy-table-row-actions-feature>
    </spy-table>
  `,
  [TableRowActionsFeatureModule],
);

export const viaConfig = getRowActionsStory(
  `
    <spy-table [config]="config" [events]="{rowActions: logActionTriggered}">
  `,
  [
    TableModule.withFeatures({
      rowActions: () =>
        import('./table-row-actions-feature.module').then(
          (m) => m.TableRowActionsFeatureModule,
        ),
    }),
  ],
);

function getRowActionsStory(
  template: string,
  extraNgModules: any[] = [],
): () => IStory {
  return () => ({
    moduleMetadata: {
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        TableModule.forRoot(),
        DatasourceModule.withDatasources({
          'mock-data': MockTableDatasourceService,
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
          type: 'mock-data',
          dataGenerator: tableDataGenerator,
        } as MockTableDatasourceConfig,
        columns: [
          { id: 'col1', title: 'Column #1' },
          { id: 'col2', title: 'Column #2' },
          { id: 'col3', title: 'Column #3' },
        ],
        rowActions: {
          enabled: true, // This will enable feature via config
          actions: [
            { id: '1234', title: '123' },
            { id: '2345', title: '234' },
            { id: 'add', title: 'Add' },
            { id: 'edit', title: 'Edit' },
            { id: 'delete', title: 'Delete' },
          ],
          click: '1234',
          availableActionsPath: 'availableActions',
        },
      },

      logActionTriggered: (event: TableActionTriggeredEvent) =>
        console.log('actionTriggered', event),
    },
  });
}
