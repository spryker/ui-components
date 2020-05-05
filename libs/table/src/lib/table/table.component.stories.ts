import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ANALYZE_FOR_ENTRY_COMPONENTS,
  Component,
  Injectable,
  Input,
} from '@angular/core';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { ContextModule, ContextService } from '@spryker/utils';
import { IStory } from '@storybook/angular';

import { ColumnTypeOption, TableColumnTypeComponent } from '../column-type';
import { TableModule } from '../table.module';
import { TableColumnComponent, TableColumnContext } from './table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableColumnListComponent } from '../table-column-list/table-column-list.component';
import { generateMockTableDataFor, TableDataMockGenerator } from '../../../../table/testing/src';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';

export default {
  title: 'TableComponent',
};

const tableDataGenerator: TableDataMockGenerator = i => ({
  col1: `col1 #${i}`,
  col2: 'col2',
  col3: 'col3',
});

@Injectable({ providedIn: 'root' })
class TableColumnTestConfig {
  @ColumnTypeOption()
  text? = this.contextService.wrap('value');

  constructor(private contextService: ContextService) {}
}

@Component({
  selector: 'spy-table-column-test',
  template: `
    {{ config.text | context: context }}
  `,
})
@TableColumnTypeComponent(TableColumnTestConfig)
class TableColumnTestComponent
  implements TableColumnComponent<TableColumnTestConfig> {
  @Input() config?: TableColumnTestConfig;
  @Input() context?: TableColumnContext;
}

export const withFeatures = (): IStory => ({
  moduleMetadata: {
    imports: [
      HttpClientTestingModule,
      ContextModule,
      MockHttpModule,
      TableModule.forRoot(),
      TableModule.withColumnComponents({
        test: TableColumnTestComponent as any,
      } as any),
      BrowserAnimationsModule,
    ],
    declarations: [TableColumnTestComponent],
    providers: [
      {
        provide: ANALYZE_FOR_ENTRY_COMPONENTS,
        useValue: [
          LayoutFlatHostComponent,
          TableColumnTestComponent,
          TableColumnListComponent,
        ],
        multi: true,
      },
    ],
  },
  template: `
    <spy-table [config]="config" [mockHttp]="mockHttp">
      <div *spyColTpl="'name'; let name">Name is3: {{ name }}</div>
      <ng-template spyColTpl="name" let-name>Name is2: {{ name }}</ng-template>
      <div *spyColTpl="'sku'; let sku">sku {{ sku }}</div>
      <div *spyColTpl="'id3'; let row='row'">{{ row.name }} - {{ row.id3 }}</div>
    </spy-table>
  `,
  props: {
    config: {
      dataUrl: '/data-request',
      columns: [
        { id: 'col1', sortable: true, title: 'Column #1', width: '20%' },
        { id: 'col2', title: 'Column #2', width: '20%' },
        {
          id: 'col3',
          title: 'Column #3',
          type: 'list',
          typeOptions: {
            limit: 2,
            type: 'test',
            typeOptions: {
              text: '${value} in ${row.col1}',
            },
          },
        },
      ],
    },
    mockHttp: setMockHttp([
      {
        url: '/data-request',
        dataFn: req => generateMockTableDataFor(req, tableDataGenerator),
      },
    ]),
  },
});
