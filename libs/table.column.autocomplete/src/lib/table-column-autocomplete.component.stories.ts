import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { Meta } from '@storybook/angular';
import { withDesign } from 'storybook-addon-designs';
import { DatasourceModule } from '@spryker/datasource';
import { DatasourceInlineService } from '@spryker/datasource.inline';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';
import { LocaleModule } from '@spryker/locale';
import { EN_LOCALE, EnLocaleModule } from '@spryker/locale/locales/en';
import { NotificationModule } from '@spryker/notification';
import { TableModule } from '@spryker/table';
import { TableDatasourceDependableService } from '@spryker/table.feature.editable';
import {
  generateMockTableDataFor,
  MockTableDatasourceConfig,
  MockTableDatasourceService,
  TableDataMockGenerator,
} from '@spryker/table/testing';
import {
  ContextModule,
  DefaultContextSerializationModule,
} from '@spryker/utils';

import { TableColumnAutocompleteComponent } from './table-column-autocomplete.component';
import { TableColumnAutocompleteModule } from './table-column-autocomplete.module';

export default {
  title: 'TableColumnAutocompleteComponent',
  component: TableColumnAutocompleteComponent,
  decorators: [withDesign],
  parameters: {
    controls: {
      include: ['config', 'context', 'mockHttp'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=5181%3A20182',
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
    mockHttp: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    config: {
      options: [
        {
          value: 'Burns Bay Road',
          title:
            'Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road',
          isDisabled: false,
        },
        {
          value: 'Downing Street',
          title: 'Downing Street',
          isDisabled: true,
        },
        {
          value: 'Wall Street',
          title: 'Wall Street',
        },
      ],
    },
  },
} as Meta;

const tableDataGenerator: TableDataMockGenerator = (i) => ({
  col1: `col1 #${i}`,
  col2: `Option ${i}`,
  col3: 'col3',
});

export const primary = (args) => ({
  props: args,
  moduleMetadata: {
    imports: [
      DatasourceModule.withDatasources({
        'mock-data': MockTableDatasourceService,
      } as any),
      TableColumnAutocompleteModule,
      DefaultContextSerializationModule,
      BrowserAnimationsModule,
    ],
  },
});
primary.args = {
  context: {
    value: '',
  },
};

export const withTable = (args) => ({
  props: args,
  moduleMetadata: {
    imports: [
      HttpClientTestingModule,
      ContextModule,
      TableColumnAutocompleteModule,
      TableModule.forRoot(),
      TableModule.withColumnComponents({
        autocomplete: TableColumnAutocompleteComponent,
      } as any),
      DatasourceModule.withDatasources({
        'mock-data': MockTableDatasourceService,
      } as any),
      DefaultContextSerializationModule,
      BrowserAnimationsModule,
    ],
    providers: [
      {
        provide: ANALYZE_FOR_ENTRY_COMPONENTS,
        useValue: [LayoutFlatHostComponent, TableColumnAutocompleteComponent],
        multi: true,
      },
    ],
  },
  template: `
    <spy-table [config]="config"></spy-table>
  `,
});
withTable.args = {
  config: {
    dataSource: {
      type: 'mock-data',
      dataGenerator: tableDataGenerator,
    } as unknown as MockTableDatasourceConfig,
    columns: [
      {
        id: 'col1',
        sortable: true,
        title: 'Column #1',
      },
      {
        id: 'col2',
        title: 'Column #2',
        type: 'autocomplete',
        typeOptions: {
          options: [
            {
              value: 'Burns Bay Road',
              title:
                'Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road',
              isDisabled: false,
            },
            {
              value: 'Downing Street',
              title: 'Downing Street',
              isDisabled: true,
            },
            {
              value: 'Wall Street',
              title: 'Wall Street',
            },
          ],
          placeholder: 'Placeholder',
        },
      },
    ],
  },
};
withTable.argTypes = {
  context: {
    table: {
      disable: true,
    },
  },
};

export const withDependentColumns = (args) => ({
  props: args,
  moduleMetadata: {
    imports: [
      HttpClientTestingModule,
      ContextModule,
      MockHttpModule,
      TableColumnAutocompleteModule,
      TableModule.forRoot(),
      TableModule.withFeatures({
        editable: () =>
          import('@spryker/table.feature.editable').then(
            (m) => m.TableEditableFeatureModule,
          ),
      }),
      TableModule.withColumnComponents({
        autocomplete: TableColumnAutocompleteComponent,
      } as any),
      DatasourceModule.withDatasources({
        'mock-data': MockTableDatasourceService,
        inline: DatasourceInlineService,
        dependable: TableDatasourceDependableService,
      } as any),
      DefaultContextSerializationModule,
      BrowserAnimationsModule,
      NotificationModule.forRoot(),
      LocaleModule.forRoot({ defaultLocale: EN_LOCALE }),
      EnLocaleModule,
    ],
    providers: [
      {
        provide: ANALYZE_FOR_ENTRY_COMPONENTS,
        useValue: [LayoutFlatHostComponent, TableColumnAutocompleteComponent],
        multi: true,
      },
    ],
  },
  template: `
    <spy-table [config]="config" [mockHttp]="mockHttp"></spy-table>
  `,
});
withDependentColumns.args = {
  config: {
    dataSource: {
      type: 'mock-data',
      dataGenerator: tableDataGenerator,
    } as unknown as MockTableDatasourceConfig,
    columns: [
      {
        id: 'col1',
        sortable: true,
        title: 'Column #1',
      },
      {
        id: 'col2',
        title: 'Column #2',
      },
      {
        id: 'col3',
        title: 'Column #3',
      },
    ],
    editable: {
      columns: [
        {
          id: 'col2',
          type: 'autocomplete',
          typeOptions: {
            datasource: {
              type: 'dependable',
              dependsOn: 'col3',
              datasource: {
                type: 'inline',
                data: [
                  {
                    value: 'Dependable Option 1',
                    title: 'Dependable Option 1',
                    isDisabled: false,
                  },
                  {
                    value: 'Dependable Option 2',
                    title: 'Dependable Option 2',
                    isDisabled: true,
                  },
                  {
                    value: 'Dependable Option 3',
                    title: 'Dependable Option 3',
                  },
                ],
              },
            },
          },
        },
        {
          id: 'col3',
          type: 'autocomplete',
          typeOptions: {
            options: [
              {
                value: 'Burns Bay Road',
                title:
                  'Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road',
                isDisabled: false,
              },
              {
                value: 'Downing Street',
                title: 'Downing Street',
                isDisabled: true,
              },
              {
                value: 'Wall Street',
                title: 'Wall Street',
              },
            ],
            placeholder: 'Col 3 Placeholder',
          },
        },
      ],
      create: {},
      update: { url: '/update-cell' },
    },
  },
  mockHttp: setMockHttp([
    {
      url: '/data-request',
      dataFn: (req) => generateMockTableDataFor(req, tableDataGenerator),
    },
    {
      url: '/update-cell',
      data: {},
    },
  ]),
};
withDependentColumns.argTypes = {
  context: {
    table: {
      disable: true,
    },
  },
};
