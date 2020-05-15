import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ANALYZE_FOR_ENTRY_COMPONENTS,
  Component,
  Injectable,
  Input,
  NgModule,
} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';
import { ContextModule, ContextService } from '@spryker/utils';
import { IStory } from '@storybook/angular';

import {
  generateMockTableDataFor,
  TableDataMockGenerator,
} from '../../../../table/testing/src';
import { TableDatasourceHttpService } from '../../../datasources/src';
import { ColumnTypeOption, TableColumnTypeComponent } from '../column-type';
import { LazyConditionModule } from '../lazy-condition/lazy-condition.module';
import { TableColumnListComponent } from '../table-column-list/table-column-list.component';
import { ModuleWithFeature } from '../table-feature-loader/types';
import { TableFeatureComponent } from '../table-feature/table-feature.component';
import { TableModule } from '../table.module';
import {
  TableColumnComponent,
  TableColumnContext,
  TableFeatureLocation,
} from './table';

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

@Component({
  selector: 'spy-table-test-feature',
  template: `
    <span
      *spyTableFeatureTpl="
        tableFeatureLocation.beforeRow;
        condition: 'data' | lcCtx | lcProp: 'col1' | lcEq: 'col1 #2';
        let i = i
      "
    >
      beforeRow {{ i }}
    </span>
    <span
      *spyTableFeatureTpl="
        tableFeatureLocation.afterRow;
        condition: 'i' | lcCtx | lcEq: 0;
        let i = i
      "
    >
      afterRow {{ i }}
    </span>
  `,
  providers: [
    { provide: TableFeatureComponent, useClass: TableFeatureTestComponent },
  ],
})
class TableFeatureTestComponent extends TableFeatureComponent {
  name = 'test';
  tableFeatureLocation = TableFeatureLocation;
}

@NgModule({
  imports: [CommonModule, TableModule, LazyConditionModule],
  declarations: [TableFeatureTestComponent],
  exports: [TableFeatureTestComponent],
  entryComponents: [TableFeatureTestComponent],
})
class TableFeatureTestModule implements ModuleWithFeature {
  featureComponent = TableFeatureTestComponent;
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
      TableModule.withFeatures({ test: async () => TableFeatureTestModule }),
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
        { id: 'col2', title: 'Column #2', width: '20%' },
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
      test: {},
    },
    mockHttp: setMockHttp([
      {
        url: '/data-request',
        dataFn: req => generateMockTableDataFor(req, tableDataGenerator),
      },
    ]),
  },
});
