import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, Injectable, Input, NgModule, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { DatasourceModule } from '@spryker/datasource';
import { MockHttpModule } from '@spryker/internal-utils';
import { LocaleModule } from '@spryker/locale';
import { EN_LOCALE, EnLocaleModule } from '@spryker/locale/locales/en';
import {
  ContextModule,
  ContextService,
  DefaultContextSerializationModule,
  InvokeModule,
} from '@spryker/utils';
import { IStory } from '@storybook/angular';

import {
  MockTableDatasourceConfig,
  MockTableDatasourceService,
  TableDataMockGenerator,
} from '../../../../table/testing/src';
import { ColumnTypeOption, TableColumnTypeComponent } from '../column-type';
import { TableColumnListComponent } from '../table-column-list/table-column-list.component';
import { TableFeatureComponent } from '../table-feature/table-feature.component';
import { TableModule } from '../table.module';
import {
  TableColumnComponent,
  TableColumnContext,
  TableConfig,
  TableFeatureLocation,
} from './table';

export default {
  title: 'TableComponent',
};

const tableDataGenerator: TableDataMockGenerator = (i) => ({
  col1: `col1 #${i}`,
  col2: 'col2',
  col3: ['col3', 'col3', 'col3'],
  col4: ['col4', 'col3', 'col2', 'col1'],
});

const tableConfig: TableConfig = {
  dataSource: {
    type: 'mock-data',
    dataGenerator: tableDataGenerator,
  } as unknown as MockTableDatasourceConfig,
  columns: [
    { id: 'col1', sortable: true, title: 'Column #1', width: '20%' },
    { id: 'col2', sortable: true, title: 'Column #2', width: '20%' },
    {
      id: 'col3',
      title: 'Column #3',
      type: 'list',
      typeOptions: {
        limit: 0,
        type: 'test',
        typeOptions: {
          text: '${value}',
        },
        typeOptionsMappings: {
          text: { col3: 'Active', false: 'Inactive' },
          color: { col3: 'green' },
        },
      },
    },
    {
      id: 'col4',
      title: 'Column #4',
      type: 'list',
      typeOptions: {
        limit: 1,
        type: 'test',
        typeOptions: {
          text: '${value} in ${row.col1}',
        },
      },
    },
  ],
};

@Injectable({ providedIn: 'root' })
class TableColumnTestConfig {
  @ColumnTypeOption()
  text? = this.contextService.wrap('value');

  constructor(private contextService: ContextService) {}
}

@Component({
  selector: 'spy-table-column-test',
  template: ` {{ config.text | context: context }} `,
})
@TableColumnTypeComponent(TableColumnTestConfig)
class TableColumnTestComponent
  implements TableColumnComponent<TableColumnTestConfig>
{
  @Input() config?: TableColumnTestConfig;
  @Input() context?: TableColumnContext;
}

@NgModule({
  imports: [
    HttpClientTestingModule,
    ContextModule,
    MockHttpModule,
    TableModule.forRoot(),
    TableModule.withColumnComponents({
      test: TableColumnTestComponent,
    } as any),
    DatasourceModule.withDatasources({
      'mock-data': MockTableDatasourceService,
    } as any),
    LocaleModule.forRoot({ defaultLocale: EN_LOCALE }),
    EnLocaleModule,
    BrowserAnimationsModule,
    DefaultContextSerializationModule,
  ],
  exports: [TableModule, MockHttpModule],
  declarations: [TableColumnTestComponent],
  entryComponents: [
    LayoutFlatHostComponent,
    TableColumnTestComponent,
    TableColumnListComponent,
  ],
})
class StoryModule {}

export const primary = (): IStory => ({
  moduleMetadata: { imports: [StoryModule] },
  template: `
    <spy-table [config]="config">
      <div *spyColTpl="'col1'; let col1">spyColTpl: {{ col1 }}</div>
      <ng-template spyColTpl="col2" let-col2>spyColTpl Template: {{ col2 }}</ng-template>
    </spy-table>
  `,
  props: {
    config: tableConfig,
  },
});

@Component({
  selector: 'spy-custom-feature',
  template: `
    <ng-container [ngSwitch]="location">
      <ng-container *ngSwitchCase="tableFeatureLocation.header">
        <div
          *spyTableFeatureTpl="
            location;
            let cellTpl;
            let cellContext = context;
            let config = config;
            let i = i
          "
        >
          Extended Custom Header!
          <div style="outline: 1px solid gray">
            <ng-container
              *ngTemplateOutlet="cellTpl; context: cellContext"
            ></ng-container>
          </div>
          {{ log | spyInvoke: { config: config, i: i } }}
        </div>
      </ng-container>

      <ng-container *ngSwitchCase="tableFeatureLocation.cell">
        <div
          *spyTableFeatureTpl="
            location;
            let cellTpl;
            let cellContext = context;
            let config = config;
            let row = row;
            let value = value;
            let i = i
          "
        >
          <p>Extended Custom Cell!</p>
          <div style="outline: 1px solid gray">
            <ng-container
              *ngTemplateOutlet="cellTpl; context: cellContext"
            ></ng-container>
          </div>
          {{
            log
              | spyInvoke
                : {
                    config: config,
                    row: row,
                    value: value,
                    i: i
                  }
          }}
        </div>
      </ng-container>

      <ng-container *ngSwitchDefault>
        <div *spyTableFeatureTpl="location; let data = data; let i = i">
          Custom Table Feature @ {{ location }}!
          {{ log | spyInvoke: { data: data, i: i } }}
        </div>
      </ng-container>
    </ng-container>
  `,
  providers: [
    { provide: TableFeatureComponent, useExisting: CustomFeatureComponent },
  ],
})
class CustomFeatureComponent extends TableFeatureComponent implements OnInit {
  tableFeatureLocation = TableFeatureLocation;

  @Input() location?: TableFeatureLocation;

  ngOnInit(): void {
    console.log(`Custom Table Feature @ ${this.location}!`);
  }

  log(context: any) {
    console.log('Feature context', context);
  }
}

function getFeatureStory(location: TableFeatureLocation): IStory {
  return {
    moduleMetadata: {
      imports: [StoryModule, InvokeModule],
      declarations: [CustomFeatureComponent],
    },
    template: `
      <spy-table [config]="config">
        <spy-custom-feature spy-table-feature [location]="location"></spy-custom-feature>
      </spy-table>
    `,
    props: {
      location,
      config: tableConfig,
    },
  };
}

export const withFeatureInTop = (): IStory =>
  getFeatureStory(TableFeatureLocation.top);

export const withFeatureInBeforeTable = (): IStory =>
  getFeatureStory(TableFeatureLocation.beforeTable);

export const withFeatureInHeader = (): IStory =>
  getFeatureStory(TableFeatureLocation.header);

export const withFeatureInHeaderExt = (): IStory =>
  getFeatureStory(TableFeatureLocation.headerExt);

export const withFeatureInBeforeRows = (): IStory =>
  getFeatureStory(TableFeatureLocation.beforeRows);

export const withFeatureInBeforeColsHeader = (): IStory =>
  getFeatureStory(TableFeatureLocation.beforeColsHeader);

export const withFeatureInBeforeCols = (): IStory =>
  getFeatureStory(TableFeatureLocation.beforeCols);

export const withFeatureInCell = (): IStory =>
  getFeatureStory(TableFeatureLocation.cell);

export const withFeatureInAfterCols = (): IStory =>
  getFeatureStory(TableFeatureLocation.afterCols);

export const withFeatureInAfterColsHeader = (): IStory =>
  getFeatureStory(TableFeatureLocation.afterColsHeader);

export const withFeatureInAfterRows = (): IStory =>
  getFeatureStory(TableFeatureLocation.afterRows);

export const withFeatureInAfterTable = (): IStory =>
  getFeatureStory(TableFeatureLocation.afterTable);

export const withFeatureInBottom = (): IStory =>
  getFeatureStory(TableFeatureLocation.bottom);

export const withFeatureInHidden = (): IStory =>
  getFeatureStory(TableFeatureLocation.hidden);
