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

import { TableDatasourceHttpService } from '@spryker/table.datasource.http';
import { LocaleModule } from '@spryker/locale';
import { EN_LOCALE, EnLocaleModule } from '@spryker/locale/locales/en';
import { DefaultContextSerializationModule } from '@spryker/utils';
import { TableSettingsFeatureModule } from './table-settings-feature.module';
import { CheckboxModule } from '@spryker/checkbox';
import { IconModule } from '@spryker/icon';
import { IconDragModule } from '@spryker/icon/icons';

export default {
  title: 'TableSettingsFeatureComponent',
};

const tableDataGenerator: TableDataMockGenerator = (i) => ({
  col1: `col1 #${i}`,
  col2: 'col2',
  col3: 'col3',
});

export const viaHtml = getSettingsStory(
  `
    <spy-table [config]="config" [mockHttp]="mockHttp" [tableId]="tableId">
        <spy-table-settings-feature spy-table-feature>
        </spy-table-settings-feature>
    </spy-table>
  `,
  [TableSettingsFeatureModule],
);

export const viaConfig = getSettingsStory(
  `
    <spy-table [config]="config" [mockHttp]="mockHttp" [tableId]="tableId">
  `,
  [
    TableModule.withFeatures({
      columnConfigurator: () =>
        import('./table-settings-feature.module').then(
          (m) => m.TableSettingsFeatureModule,
        ),
    }),
  ],
);

function getSettingsStory(
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
        TableSettingsFeatureModule,
        LocaleModule.forRoot({ defaultLocale: EN_LOCALE }),
        EnLocaleModule,
        DefaultContextSerializationModule,
        CheckboxModule,
        IconModule,
        IconDragModule,
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
      tableId: 'tableID',
      config: {
        dataSource: {
          type: 'http',
          url: '/data-request',
        },
        columns: [
          { id: 'col1', title: 'Column #1', hideable: true },
          { id: 'col2', title: 'Column #2', hideable: true },
          { id: 'col3', title: 'Column #3', hideable: true },
        ],
        columnConfigurator: {
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
