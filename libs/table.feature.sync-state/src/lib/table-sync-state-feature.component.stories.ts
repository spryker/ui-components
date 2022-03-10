import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { DatasourceModule } from '@spryker/datasource';
import { TableModule } from '@spryker/table';
import {
  MockTableDatasourceConfig,
  MockTableDatasourceService,
  TableDataMockGenerator,
} from '@spryker/table/testing';
import { DefaultContextSerializationModule } from '@spryker/utils';
import { IStory } from '@storybook/angular';

import { TableSyncStateFeatureModule } from './table-sync-state-feature.module';

export default {
  title: 'TableSyncStateFeatureComponent',
};

const tableDataGenerator: TableDataMockGenerator = (i) => ({
  col1: `col1 #${i}`,
  col2: 'col2',
  col3: 'col3',
});

export const viaHtml = getSyncStateStory(
  `
    <spy-table [config]="config">
      <spy-table-sync-state-feature spy-table-feature></spy-table-sync-state-feature>
    </spy-table>
  `,
  [TableSyncStateFeatureModule],
);

export const viaConfig = getSyncStateStory(
  `
    <spy-table [config]="config">
  `,
  [
    TableModule.withFeatures({
      syncStateUrl: () =>
        import('./table-sync-state-feature.module').then(
          (m) => m.TableSyncStateFeatureModule,
        ),
    }),
  ],
);

function getSyncStateStory(
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
        } as any),
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
        } as unknown as MockTableDatasourceConfig,
        columns: [
          { id: 'col1', title: 'Column #1', sortable: true },
          { id: 'col2', title: 'Column #2' },
          { id: 'col3', title: 'Column #3' },
        ],
        syncStateUrl: {
          enabled: true, // This will enable feature via config
        },
      },
    },
  });
}
