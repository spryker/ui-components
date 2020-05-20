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
import { TableDatasourceHttpService } from '../../../datasources/src';
import { TableColumnComponent, TableColumnContext } from './table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableColumnListComponent } from '../table-column-list/table-column-list.component';
import {
  generateMockTableDataFor,
  TableDataMockGenerator,
} from '../../../../table/testing/src';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';

export default {
  title: 'TableComponent',
};

const tableDataGenerator: TableDataMockGenerator = i => ({
  col1: `col1 #${i}`,
  col2: 'col2',
  col3: 'col3',
  col4: 'col4',
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
        test: TableColumnTestComponent,
      } as any),
      TableModule.withDatasourceTypes({
        http: TableDatasourceHttpService,
      }),
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
          TableDatasourceHttpService,
        ],
        multi: true,
      },
    ],
  },
  template: `
    <spy-table [config]="config" [mockHttp]="mockHttp">
      <div *spyColTpl="'col1'; let col1">spyColTpl: {{ col1 }}</div>
      <ng-template spyColTpl="col2" let-col2>spyColTpl Template: {{ col2 }}</ng-template>
    </spy-table>
  `,
  props: {
    config: {
      dataSource: {
        type: 'http',
        url: '/data-request',
      },
      columns: [
        { id: 'col1', sortable: true, title: 'Column #1', width: '20%' },
        { id: 'col2', sortable: true, title: 'Column #2', width: '20%' },
        {
          id: 'col3',
          title: 'Column #3',
          type: 'test',
          typeOptions: {
            text: '${value}',
          },
          typeOptionsMappings: {
            text: { col3: 'Active', false: 'Inactive' },
            color: { col3: 'green' },
          },
        },
        {
          id: 'col4',
          title: 'Column #4',
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
