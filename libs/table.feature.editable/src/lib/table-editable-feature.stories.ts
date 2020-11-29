import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, Injectable, Input, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { LocaleModule } from '@spryker/locale';
import { EN_LOCALE, EnLocaleModule } from '@spryker/locale/locales/en';
import { NotificationModule } from '@spryker/notification';
import {
  TableColumnComponent,
  TableColumnContext,
  TableColumns,
  TableColumnTypeComponent,
  TableModule,
} from '@spryker/table';
import {
  MockTableDatasourceConfig,
  MockTableDatasourceService,
  TableDataMockGenerator,
} from '@spryker/table/testing';
import { DefaultContextSerializationModule } from '@spryker/utils';
import { IStory } from '@storybook/angular';

import { TableEditableFeatureModule } from './table-editable-feature.module';
import { TableEditableService } from './table-editable-feature.service';
import { TableEditableEditRequestToken } from './tokens';

import {
  TableColumnInputModule,
  TableColumnInputComponent,
} from '@spryker/table.column.input';

export default {
  title: 'TableEditableFeatureComponent',
};

const tableDataGenerator: TableDataMockGenerator = (i) => ({
  col1: `${i} col1`,
  col2: `${i} col2`,
  col3: `${i} col3`,
  col4: `${i} col4`,
});

class TableEditableDataSerializer {
  serialize(data: any): unknown {
    return JSON.stringify(data);
  }
}

const tableConfig = {
  dataSource: {
    type: 'mock-data',
    dataGenerator: tableDataGenerator,
  } as MockTableDatasourceConfig,
  columns: [
    { id: 'col1', title: 'Column #1' },
    { id: 'col2', title: 'Column #2' },
    { id: 'col3', title: 'Column #3' },
    { id: 'col4', title: 'Column #4' },
  ] as TableColumns,
  editable: {
    columns: [
      { id: 'col1', type: 'input' as any },
      { id: 'col2', type: 'edit' as any },
      { id: 'col4', type: 'edit' as any },
    ] as TableColumns,
    create: {
      addButton: {},
      cancelButton: {},
      formInputName: 'form-input-name',
      initialData: {
        data: [
          { col3: 'Option 1', col1: 'test' },
          { col1: 'value' },
          { col1: 'value', col3: 'Option 1', col4: 'value' },
          { col2: 'value' },
          { col2: 'value', col3: 'value' },
          { col1: 'value', col3: 'Option 1', col4: 'value' },
        ],
        errors: {
          2: {
            columnErrors: {
              col1: 'errorMessage errorMessage errorMessage',
            },
          },
          0: {
            rowError: 'message',
            columnErrors: {
              col1: 'errorMessage errorMessage errorMessage',
            },
          },
        },
      },
    },
    update: {
      url: 'test-url',
      saveButton: {},
      cancelButton: {},
    },
  },
  rowActions: {
    enabled: true, // This will enable feature via config
    actions: [
      { id: '1234', title: '123' },
      { id: '2345', title: '234' },
      { id: 'add', title: 'Add' },
      { id: 'edit', title: 'Edit' },
      { id: 'delete', title: 'Delete' },
    ],
    click: '1234',
    availableActionsPath: 'availableActions',
  },
};

@Injectable({ providedIn: 'root' })
class EditColumnConfig {
  type = 'text';
}

@Component({
  selector: 'spy-edit-column',
  template: `
    Edit Column {{ context.config.id }}
    <div>
      <input
        [type]="config?.type"
        [value]="context?.value"
        (input)="updateValue(input.value)"
        [ngStyle]="{ border: '1px solid black' }"
        #input
      />
      <div>
        {{ config?.editableError }}
      </div>
    </div>
  `,
  providers: [TableEditableService],
})
@TableColumnTypeComponent(EditColumnConfig)
class EditColumnComponent implements TableColumnComponent<EditColumnConfig> {
  @Input() config?: EditColumnConfig;
  @Input() context?: TableColumnContext;

  constructor(private tableEditableService: TableEditableService) {}

  updateValue(value: string) {
    // tslint:disable-next-line: no-non-null-assertion
    this.tableEditableService.updateValue(value, this.context!.config);
  }
}

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientTestingModule,
    TableModule.forRoot(),
    TableColumnInputModule,
    TableModule.withDatasourceTypes({
      'mock-data': MockTableDatasourceService,
    }),
    TableModule.withColumnComponents({
      input: TableColumnInputComponent,
      edit: EditColumnComponent,
    } as any),
    DefaultContextSerializationModule,
    NotificationModule.forRoot(),
    LocaleModule.forRoot({ defaultLocale: EN_LOCALE }),
    EnLocaleModule,
  ],
  exports: [TableModule],
  declarations: [EditColumnComponent],
  entryComponents: [
    LayoutFlatHostComponent,
    TableColumnInputComponent,
    EditColumnComponent,
  ],
  providers: [
    {
      provide: TableEditableEditRequestToken,
      useClass: TableEditableDataSerializer,
    },
  ],
})
class StoryModule {}

export function viaHtml(): IStory {
  return {
    moduleMetadata: { imports: [StoryModule, TableEditableFeatureModule] },
    template: `
      <spy-table [config]="config">
        <spy-table-editable-feature spy-table-feature></spy-table-editable-feature>
      </spy-table>
    `,
    props: {
      config: tableConfig,
    },
  };
}

export function viaConfig(): IStory {
  return {
    moduleMetadata: {
      imports: [
        StoryModule,
        TableModule.withFeatures({
          editable: () =>
            import('./table-editable-feature.module').then(
              (m) => m.TableEditableFeatureModule,
            ),

          rowActions: () =>
            import('@spryker/table.feature.row-actions').then(
              (m) => m.TableRowActionsFeatureModule,
            ),
        }),
      ],
    },
    template: `
      <spy-table [config]="config"></spy-table>
    `,
    props: {
      config: tableConfig,
    },
  };
}
