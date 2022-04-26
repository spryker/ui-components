import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, Injectable, Input, NgModule, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta } from '@storybook/angular';
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
import {
  MockTableDatasourceConfig,
  MockTableDatasourceService,
  TableDataMockGenerator,
} from '../../../testing/src';
import { ColumnTypeOption, TableColumnTypeComponent } from '../column-type';
import { TableColumnListConfig } from '../table-column-list/table-column-list.component';
import { TableFeatureComponent } from '../table-feature';
import { CoreTableComponent } from './table.component';
import { TableModule } from '../table.module';
import {
  TableColumnComponent,
  TableColumnContext,
  TableConfig,
  TableFeatureLocation,
} from './table';

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

export default {
  title: 'TableComponent',
  component: CoreTableComponent,
  parameters: {
    controls: {
      include: ['config', 'tableId'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=319%3A445',
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
    config: tableConfig,
    tableId: 'someId',
  },
} as Meta;

@Injectable({ providedIn: 'root' })
class TableColumnTestConfig {
  @ColumnTypeOption()
  text? = this.contextService.wrap('displayValue');

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

declare module '../table/table' {
  interface TableColumnTypeRegistry {
    list: TableColumnListConfig;
  }
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
})
class StoryModule {}

export const primary = (args) => ({
  props: args,
  moduleMetadata: { imports: [StoryModule] },
  template: `
    <spy-table [config]="config" [tableId]="tableId">
      <div *spyColTpl="'col1'; let col1">spyColTpl: {{ col1 }}</div>
      <ng-template spyColTpl="col2" let-col2>spyColTpl Template: {{ col2 }}</ng-template>
    </spy-table>
  `,
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

function getFeatureStory(args, location: TableFeatureLocation) {
  return {
    props: {
      ...args,
      location,
    },
    moduleMetadata: {
      imports: [StoryModule, InvokeModule],
      declarations: [CustomFeatureComponent],
    },
    template: `
      <spy-table [config]="config" [tableId]="tableId">
        <spy-custom-feature spy-table-feature [location]="location"></spy-custom-feature>
      </spy-table>
    `,
  };
}

export const withFeatureInTop = (args) =>
  getFeatureStory(args, TableFeatureLocation.top);

export const withFeatureInBeforeTable = (args) =>
  getFeatureStory(args, TableFeatureLocation.beforeTable);

export const withFeatureInHeader = (args) =>
  getFeatureStory(args, TableFeatureLocation.header);

export const withFeatureInHeaderExt = (args) =>
  getFeatureStory(args, TableFeatureLocation.headerExt);

export const withFeatureInBeforeRows = (args) =>
  getFeatureStory(args, TableFeatureLocation.beforeRows);

export const withFeatureInBeforeColsHeader = (args) =>
  getFeatureStory(args, TableFeatureLocation.beforeColsHeader);

export const withFeatureInBeforeCols = (args) =>
  getFeatureStory(args, TableFeatureLocation.beforeCols);

export const withFeatureInCell = (args) =>
  getFeatureStory(args, TableFeatureLocation.cell);

export const withFeatureInAfterCols = (args) =>
  getFeatureStory(args, TableFeatureLocation.afterCols);

export const withFeatureInAfterColsHeader = (args) =>
  getFeatureStory(args, TableFeatureLocation.afterColsHeader);

export const withFeatureInAfterRows = (args) =>
  getFeatureStory(args, TableFeatureLocation.afterRows);

export const withFeatureInAfterTable = (args) =>
  getFeatureStory(args, TableFeatureLocation.afterTable);

export const withFeatureInBottom = (args) =>
  getFeatureStory(args, TableFeatureLocation.bottom);

export const withFeatureInHidden = (args) =>
  getFeatureStory(args, TableFeatureLocation.hidden);
