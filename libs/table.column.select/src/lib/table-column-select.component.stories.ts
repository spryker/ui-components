import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { Meta } from '@storybook/angular';
import { DatasourceModule } from '@spryker/datasource';
import { DatasourceInlineService } from '@spryker/datasource.inline';
import { DatasourceHttpService } from '@spryker/datasource.http';
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

import { TableColumnSelectComponent } from './table-column-select.component';
import { TableColumnSelectModule } from './table-column-select.module';

const tableDataGenerator: TableDataMockGenerator = (i) => ({
  col1: `${i}`,
  col2: `Option ${i}`,
  col3: `col3 #${i}`,
});

export default {
  title: 'TableColumnSelectComponent',
  component: TableColumnSelectComponent,
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
    context: {
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
        'Option 1',
        'Option 2',
        'Option 3',
        'Option 4',
        'Option 5',
        'Option 6',
        'Option 7',
        'Option 8',
        'Option 9',
        'Option 10',
      ],
      placeholder: '123',
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
  },
} as Meta;

export const primary = (args) => ({
  props: args,
  moduleMetadata: {
    imports: [
      DatasourceModule.withDatasources({
        'mock-data': MockTableDatasourceService,
      } as any),
      TableColumnSelectModule,
      DefaultContextSerializationModule,
      BrowserAnimationsModule,
    ],
  },
});
primary.args = {
  context: {
    value: 'Option 3',
  },
};
primary.argTypes = {
  config: {
    table: {
      disable: false,
    },
  },
  context: {
    table: {
      disable: false,
    },
  },
};

export const withTable = (args) => ({
  props: args,
  moduleMetadata: {
    imports: [
      HttpClientTestingModule,
      ContextModule,
      TableColumnSelectModule,
      TableModule.forRoot(),
      TableModule.withColumnComponents({
        select: TableColumnSelectComponent,
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
        useValue: [LayoutFlatHostComponent, TableColumnSelectComponent],
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
      { id: 'col1', sortable: true, title: 'Column #1' },
      {
        id: 'col2',
        title: 'Column #2',
        type: 'select',
        typeOptions: {
          options: [
            {
              title: 'Option 1',
              value: 'Option 1',
            },
            {
              title: 'Option 2',
              value: 'Option 2',
              isDisabled: true,
            },
            {
              title: 'Option 3',
              value: 'Option 3',
            },
          ],
          placeholder: '123',
        },
      },
    ],
  },
};

export const withInlineDependentColumns = (args) => ({
  props: args,
  moduleMetadata: {
    imports: [
      HttpClientTestingModule,
      ContextModule,
      MockHttpModule,
      TableColumnSelectModule,
      TableModule.forRoot(),
      TableModule.withFeatures({
        editable: () =>
          import('@spryker/table.feature.editable').then(
            (m) => m.TableEditableFeatureModule,
          ),
      }),
      TableModule.withColumnComponents({
        select: TableColumnSelectComponent,
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
        useValue: [LayoutFlatHostComponent, TableColumnSelectComponent],
        multi: true,
      },
    ],
  },
  template: `
    <spy-table [config]="config" [mockHttp]="mockHttp"></spy-table>
  `,
});
withInlineDependentColumns.args = {
  config: {
    dataSource: {
      type: 'mock-data',
      dataGenerator: tableDataGenerator,
    } as unknown as MockTableDatasourceConfig,
    columns: [
      { id: 'col1', sortable: true, title: 'Column #1' },
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
          type: 'select',
          typeOptions: {
            datasource: {
              type: 'dependable',
              dependsOn: 'col3',
              datasource: {
                type: 'inline',
                data: ['Inline 1', 'Inline 2'],
              },
            },
          },
        },
        {
          id: 'col3',
          type: 'select',
          typeOptions: {
            options: ['Option 1', 'Option 2'],
          },
        },
      ],
      create: {},
      update: { url: '/update-cell' },
    },
  },
};

export const withHttpDependentColumns = (args) => ({
  props: args,
  moduleMetadata: {
    imports: [
      HttpClientTestingModule,
      ContextModule,
      MockHttpModule,
      TableColumnSelectModule,
      TableModule.forRoot(),
      TableModule.withFeatures({
        editable: () =>
          import('@spryker/table.feature.editable').then(
            (m) => m.TableEditableFeatureModule,
          ),
      }),
      TableModule.withColumnComponents({
        select: TableColumnSelectComponent,
      } as any),
      DatasourceModule.withDatasources({
        'mock-data': MockTableDatasourceService,
        http: DatasourceHttpService,
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
        useValue: [LayoutFlatHostComponent, TableColumnSelectComponent],
        multi: true,
      },
    ],
  },
  template: `
    <spy-table [config]="config" [mockHttp]="mockHttp"></spy-table>
  `,
});
withHttpDependentColumns.args = {
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
          type: 'select',
          typeOptions: {
            datasource: {
              type: 'dependable',
              dependsOn: 'col1',
              datasource: {
                type: 'http',
                url: '/data-request-2',
              },
            },
          },
        },
        {
          id: 'col3',
          type: 'select',
          typeOptions: {
            options: ['Option 1', 'Option 2'],
          },
        },
      ],
      create: {
        addButton: {},
        cancelButton: {},
      },
      update: { url: '/update-cell' },
    },
  },
};
