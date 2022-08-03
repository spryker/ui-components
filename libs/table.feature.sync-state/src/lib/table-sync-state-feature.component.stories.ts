import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { IStory, Meta } from '@storybook/angular';
import { DatasourceModule } from '@spryker/datasource';
import { TableModule } from '@spryker/table';
import {
  MockTableDatasourceConfig,
  MockTableDatasourceService,
  TableDataMockGenerator,
} from '@spryker/table/testing';
import { DefaultContextSerializationModule } from '@spryker/utils';

import { TableSyncStateFeatureModule } from './table-sync-state-feature.module';

const tableDataGenerator: TableDataMockGenerator = (i) => ({
  col1: `col1 #${i}`,
  col2: 'col2',
  col3: 'col3',
});

export default {
  title: 'TableSyncStateFeatureComponent',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=1365%3A7734',
      allowFullscreen: true,
    },
  },
  argTypes: {
    //ToDo: change to readonly after release https://github.com/storybookjs/storybook/issues/14048
    config: {
      table: {
        disable: true,
      },
    },
  },
  args: {
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
} as Meta;

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
    <spy-table [config]="config"></spy-table>
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
): (args) => IStory {
  return (args) => ({
    props: args,
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
  });
}
