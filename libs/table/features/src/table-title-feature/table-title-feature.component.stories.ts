import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { IStory } from '@storybook/angular';
import { TableModule } from '@spryker/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableTitleFeatureModule } from './table-title-feature.module';
import {
  generateMockTableDataFor,
  TableDataMockGenerator,
} from '@spryker/table/testing';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';
import { TableDatasourceHttpService } from '../../../datasources/src/table-datasource-http';
import { DefaultContextSerializationModule } from '@spryker/utils';

export default {
  title: 'TableTitleFeatureComponent',
};

const tableDataGenerator: TableDataMockGenerator = i => ({
  col1: `col1 #${i}`,
  col2: 'col2',
  col3: 'col3',
});

export const viaHtml = getTitleStory(
  `
    <spy-table [config]="config" [mockHttp]="mockHttp">
      <spy-table-title-feature spy-table-feature></spy-table-title-feature>
    </spy-table>
  `,
  [TableTitleFeatureModule],
);

export const viaConfig = getTitleStory(
  `
    <spy-table [config]="config" [mockHttp]="mockHttp">
  `,
  [
    TableModule.withFeatures({
      search: () =>
        import('./table-title-feature.module').then(
          m => m.TableTitleFeatureModule,
        ),
    }),
  ],
);

function getTitleStory(
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
          { id: 'col1', title: 'Column #1' },
          { id: 'col2', title: 'Column #2' },
          { id: 'col3', title: 'Column #3' },
        ],
        title: {
          enabled: true, // This will enable feature via config
          title: 'Table title',
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
