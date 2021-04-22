import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { IStory } from '@storybook/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockTableDatasourceConfig, MockTableDatasourceService, TableDataMockGenerator } from '@spryker/table/testing';
import { ContextModule, DefaultContextSerializationModule } from '@spryker/utils';
import { TableModule } from '@spryker/table';
import { DatasourceModule } from '@spryker/datasource';
import { TableColumnSelectComponent, TableColumnSelectModule } from '@spryker/table.column.select';
import { TableColumnTextComponent, TableColumnTextModule } from '@spryker/table.column.text';
import { TableColumnChipComponent, TableColumnChipModule } from '@spryker/table.column.chip';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { TableColumnDynamicComponent } from './table-column-dynamic.component';
import { TableColumnDynamicModule } from './table-column-dynamic.module';

export default {
  title: 'TableColumnDynamicComponent'
}

const tableDataGenerator: TableDataMockGenerator = (i) => ({
  col1: `${i}`,
  col2: `Option ${i}`,
  col3: `col3 #${i}`,
  _col3_Type: i % 2 ? 'text' : 'chip',
  _col3_TypeOptions: i % 2 ? {} : { color: 'grey' },
});

export const primary = (): IStory => ({
  moduleMetadata: {
    imports: [
      HttpClientTestingModule,
      ContextModule,
      TableColumnSelectModule,
      TableModule.forRoot(),
      TableModule.withColumnComponents({
        text: TableColumnTextComponent,
        chip: TableColumnChipComponent,
        select: TableColumnSelectComponent,
        dynamic: TableColumnDynamicComponent,
      } as any),
      DatasourceModule.withDatasources({
        'mock-data': MockTableDatasourceService,
      }),
      DefaultContextSerializationModule,
      BrowserAnimationsModule,
      TableColumnDynamicModule,
      TableColumnTextModule,
      TableColumnChipModule,
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
  props: {
    config: {
      dataSource: {
        type: 'mock-data',
        dataGenerator: tableDataGenerator,
      } as MockTableDatasourceConfig,
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
        {
          id: 'col3',
          title: 'Column #3',
          type: 'dynamic',
          typeOptions: {
            type: '${row._col3_Type}',
            typeOptions: '${row._col3_TypeOptions}',
          },
        },
      ],
    },
  },
});
