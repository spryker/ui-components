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

import { TableTotalFeatureModule } from './table-total-feature.module';
import { TableDatasourceHttpService } from '@spryker/table.datasource.http';
import { LocaleModule } from '@spryker/locale';
import { EN_LOCALE, EnLocaleModule } from '@spryker/locale/locales/en';
import { DefaultContextSerializationModule } from '@spryker/utils';

export default {
  title: 'TableTotalFeatureComponent',
};

const tableDataGenerator: TableDataMockGenerator = (i) => ({
  col1: `col1 #${i}`,
  col2: 'col2',
  col3: 'col3',
});

export const viaHtml = getTotalStory(
  `
    <spy-table [config]="config" [mockHttp]="mockHttp">
      <spy-table-total-feature spy-table-feature></spy-table-total-feature>
    </spy-table>
  `,
  [TableTotalFeatureModule],
);

export const viaConfig = getTotalStory(
  `
    <spy-table [config]="config" [mockHttp]="mockHttp">
  `,
  [
    TableModule.withFeatures({
      total: () =>
        import('./table-total-feature.module').then(
          (m) => m.TableTotalFeatureModule,
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
          { id: 'col1', title: 'Column #1' },
          { id: 'col2', title: 'Column #2' },
          { id: 'col3', title: 'Column #3' },
        ],
        total: {
          enabled: true, // This will enable feature via config
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
