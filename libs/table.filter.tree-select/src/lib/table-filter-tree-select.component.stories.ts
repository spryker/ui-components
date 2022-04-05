import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { IStory, Meta } from '@storybook/angular';
import { withDesign } from 'storybook-addon-designs';
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

import { TableFilterTreeSelectComponent } from './table-filter-tree-select.component';
import { TableFilterTreeSelectModule } from './table-filter-tree-select.module';

const tableDataGenerator: TableDataMockGenerator = (i) => ({
  col1: `col1 #${i}`,
  col2: 'col2',
  col3: 'col3',
});

export default {
  title: 'TableFilterTreeSelectComponent',
  decorators: [withDesign],
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
            id: 'tree-select',
            title: 'TreeSelect',
            type: 'tree-select',
            typeOptions: {
              multiselect: true,
              values: [
                { value: 1, title: 'Option_1' },
                {
                  value: 2,
                  title: 'Option_2',
                  children: [
                    { value: 9, title: 'Option_9' },
                    { value: 10, title: 'Option_10' },
                    { value: 11, title: 'Option_11' },
                    { value: 12, title: 'Option_12' },
                  ],
                },
                { value: 3, title: 'Option_3' },
                { value: 4, title: 'Option_4' },
                { value: 5, title: 'Option_5' },
                { value: 0, title: 'Option_0' },
              ],
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
          'tree-select': TableFilterTreeSelectComponent,
        } as any),
        DefaultContextSerializationModule,
        DatasourceModule.withDatasources({
          'mock-data': MockTableDatasourceService,
        } as any),
        TableFilterTreeSelectModule,
        LocaleModule.forRoot({ defaultLocale: EN_LOCALE }),
        EnLocaleModule,
        ...extraNgModules,
      ],
      providers: [
        {
          provide: ANALYZE_FOR_ENTRY_COMPONENTS,
          useValue: [LayoutFlatHostComponent, TableFilterTreeSelectComponent],
          multi: true,
        },
      ],
    },
    template,
  });
}
