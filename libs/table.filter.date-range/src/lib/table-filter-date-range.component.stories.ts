import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { IStory, Meta } from '@storybook/angular';
import { DatasourceModule } from '@spryker/datasource';
import { LocaleModule } from '@spryker/locale';
import { EN_LOCALE, EnLocaleModule } from '@spryker/locale/locales/en';
import { TableModule } from '@spryker/table';
import { TableFiltersFeatureModule } from '@spryker/table.feature.filters';
import {
  MockTableDatasourceConfig,
  MockTableDatasourceService,
  TableDataMockGenerator,
} from '@spryker/table/testing';
import { DefaultContextSerializationModule } from '@spryker/utils';

import { TableFilterDateRangeComponent } from './table-filter-date-range.component';
import { TableFilterDateRangeModule } from './table-filter-date-range.module';

const tableDataGenerator: TableDataMockGenerator = (i) => ({
  col1: `col1 #${i}`,
  col2: 'col2',
  col3: 'col3',
});

export default {
  title: 'TableFilterDateRangeComponent',
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
        { id: 'col1', title: 'Column #1' },
        { id: 'col2', title: 'Column #2' },
        { id: 'col3', title: 'Column #3' },
      ],
      filters: {
        enabled: true, // This will enable feature via config
        items: [
          {
            id: 'range',
            title: 'Range',
            type: 'date-range',
            typeOptions: {
              placeholderFrom: 'from',
              placeholderTo: 'to',
            },
          },
        ],
      },
    },
  },
} as Meta;

export const viaHtml = getFiltersStory(
  `
    <spy-table [config]="config">
      <spy-table-filters-feature spy-table-feature></spy-table-filters-feature>
    </spy-table>
  `,
  [TableFiltersFeatureModule],
);

export const viaConfig = getFiltersStory(
  `
    <spy-table [config]="config"></spy-table>
  `,
  [
    TableModule.withFeatures({
      filters: () =>
        import('@spryker/table.feature.filters').then(
          (m) => m.TableFiltersFeatureModule,
        ),
    }),
  ],
);

function getFiltersStory(
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
        TableFiltersFeatureModule.withFilterComponents({
          'date-range': TableFilterDateRangeComponent,
        } as any),
        DefaultContextSerializationModule,
        DatasourceModule.withDatasources({
          'mock-data': MockTableDatasourceService,
        } as any),
        TableFilterDateRangeModule,
        LocaleModule.forRoot({ defaultLocale: EN_LOCALE }),
        EnLocaleModule,
        ...extraNgModules,
      ],
      providers: [
        {
          provide: ANALYZE_FOR_ENTRY_COMPONENTS,
          useValue: [LayoutFlatHostComponent, TableFilterDateRangeComponent],
          multi: true,
        },
      ],
    },
    template,
  });
}
