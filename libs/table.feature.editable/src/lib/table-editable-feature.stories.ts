import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  Component,
  ElementRef,
  Injectable,
  Input,
  NgModule,
} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
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
import { TableEditableConfig, TableEditableEvent } from './types';

export default {
  title: 'TableEditableFeatureComponent',
};

const tableDataGenerator: TableDataMockGenerator = i => ({
  col1: `${i} col1`,
  col2: `${i} col2`,
  col3: `${i} col3`,
  col4: `${i} col4`,
});

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
    urls: { create: '', update: '' },
    columns: [
      { id: 'col1', type: 'edit' as any },
      { id: 'col2', type: 'edit' as any },
      { id: 'col3', type: 'edit' as any },
      { id: 'col4', type: 'edit' as any },
    ],
    addRowButton: { title: 'Add new row' },
  } as TableEditableConfig,
};

@Injectable({ providedIn: 'root' })
class EditColumnConfig {
  type = 'text';
}

@Component({
  selector: 'spy-edit-column',
  template: `
    Edit Column {{ context.config.id }}
    <p>
      <input
        [type]="config?.type"
        [value]="context?.value"
        (input)="updateValue(input.value)"
        #input
      />
    </p>
  `,
})
@TableColumnTypeComponent(EditColumnConfig)
class EditColumnComponent implements TableColumnComponent<EditColumnConfig> {
  @Input() config?: EditColumnConfig;
  @Input() context?: TableColumnContext;

  constructor(private elemRef: ElementRef<HTMLElement>) {}

  updateValue(value: string) {
    const editableEvent = new TableEditableEvent({
      value,
      // tslint:disable-next-line: no-non-null-assertion
      colId: this.context?.config.id!,
    });

    this.elemRef.nativeElement.dispatchEvent(editableEvent);
  }
}

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientTestingModule,
    TableModule.forRoot(),
    TableModule.withDatasourceTypes({
      'mock-data': MockTableDatasourceService,
    }),
    TableModule.withColumnComponents({ edit: EditColumnComponent } as any),
    DefaultContextSerializationModule,
  ],
  exports: [TableModule],
  declarations: [EditColumnComponent],
  entryComponents: [LayoutFlatHostComponent, EditColumnComponent],
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
              m => m.TableEditableFeatureModule,
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
