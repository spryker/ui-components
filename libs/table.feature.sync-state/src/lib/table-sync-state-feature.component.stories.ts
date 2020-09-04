import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { IStory } from '@storybook/angular';
import { TableModule } from '@spryker/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableSyncStateFeatureModule } from './table-sync-state-feature.module';
import {
  generateMockTableDataFor,
  TableDataMockGenerator,
} from '@spryker/table/testing';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';
import { TableDatasourceHttpService } from '@spryker/table.datasource.http';
import { DefaultContextSerializationModule } from '@spryker/utils';

export default {
  title: 'TableSyncStateFeatureComponent',
};

const tableDataGenerator: TableDataMockGenerator = i => ({
  col1: `col1 #${i}`,
  col2: 'col2',
  col3: 'col3',
});

export const viaHtml = getSyncStateStory(
  `
    <spy-table [config]="config" [mockHttp]="mockHttp">
      <spy-table-sync-state-feature spy-table-feature></spy-table-sync-state-feature>
    </spy-table>
  `,
  [TableSyncStateFeatureModule],
);

export const viaConfig = getSyncStateStory(
  `
    <spy-table [config]="config" [mockHttp]="mockHttp">
  `,
  [
    TableModule.withFeatures({
      syncStateUrl: () =>
        import('./table-sync-state-feature.module').then(
          m => m.TableSyncStateFeatureModule,
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
        MockHttpModule,
        TableModule.forRoot(),
        TableModule.withDatasourceTypes({
          http: TableDatasourceHttpService,
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
          type: 'http',
          url: '/data-request',
        },
        columns: [
          { id: 'col1', title: 'Column #1', sortable: true },
          { id: 'col2', title: 'Column #2' },
          { id: 'col3', title: 'Column #3' },
        ],
        syncStateUrl: {
          enabled: true, // This will enable feature via config
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
