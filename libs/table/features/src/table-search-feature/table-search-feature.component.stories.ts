import { HttpClientModule } from '@angular/common/http';
import {
  ANALYZE_FOR_ENTRY_COMPONENTS,
  Component,
  Injectable,
  Input,
} from '@angular/core';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { ContextModule, ContextService } from '@spryker/utils';
import { object } from '@storybook/addon-knobs';
import { IStory } from '@storybook/angular';

import { ColumnTypeOption, TableColumnTypeComponent } from '@spryker/table';
import { TableModule } from '@spryker/table';
import { TableColumnComponent, TableColumnContext } from '@spryker/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableSearchFeatureModule } from '@spryker/table/features';
import { TableFiltersFeatureModule } from '../table-filters-feature';
import {
  TableFilterSelectComponent,
  TableFilterSelectModule,
} from '../../../filters/src/table-filter-select/';

export default {
  title: 'TableSearchFeatureComponent',
};

@Injectable({ providedIn: 'root' })
class TableColumnTestConfig {
  @ColumnTypeOption()
  text? = this.contextService.wrap('value');

  constructor(private contextService: ContextService) {}
}

@Component({
  selector: 'table-column-test',
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
      HttpClientModule,
      ContextModule,
      TableModule,
      TableModule.forRoot(),
      TableModule.withColumnComponents({
        test: TableColumnTestComponent,
      } as any),
      BrowserAnimationsModule,
      TableSearchFeatureModule,
      TableFiltersFeatureModule,
      TableFiltersFeatureModule.withFilterComponents({
        select: TableFilterSelectComponent as any,
        select2: TableFilterSelectComponent as any,
      } as any),
      TableFilterSelectModule,
    ],
    declarations: [TableColumnTestComponent],
    providers: [
      {
        provide: ANALYZE_FOR_ENTRY_COMPONENTS,
        useValue: [
          LayoutFlatHostComponent,
          TableColumnTestComponent,
          TableFilterSelectComponent,
        ],
        multi: true,
      },
    ],
  },
  template: `
    <spy-table [config]="config" (actionTriggered)="logActions($event)">
      <spy-table-search-feature spy-table-feature location="top"></spy-table-search-feature>
      <spy-table-filters-feature spy-table-feature location="top"></spy-table-filters-feature>
      <div *spyColTpl="'name'; let name">Name is3: {{ name }}</div>
      <ng-template spyColTpl="name" let-name>Name is2: {{ name }}</ng-template>
      <div *spyColTpl="'sku'; let sku">sku {{ sku }}</div>
      <div *spyColTpl="'id3'; let row='row'">{{ row.name }} - {{ row.id3 }}</div>
    </spy-table>
  `,
  props: {
    config: object(
      'Config',
      {
        search: {
          placeholder: 'Placeholder',
        },
        dataUrl: 'https://angular-recipe-24caa.firebaseio.com/data.json',
        columns: [
          { id: 'name', sortable: true, title: 'name', width: '20%' },
          { id: 'sku', sortable: true, title: 'sku', width: '20%' },
          { id: 'id3', sortable: true, title: 'id3' },
          {
            id: 'sku3',
            title: 'sku3 | link',
            type: 'test',
            typeOptions: { text: '${value} in ${row.name}' },
          },
        ],
        selectable: true,
        rowActions: [
          { id: '1234', title: '123' },
          { id: '2345', title: '234' },
        ],
        pageSizes: [20, 40, 50],
        filters: [
          {
            id: 'offers',
            title: 'Has Offers',
            type: 'select',
            typeOptions: {
              multiselect: false,
              values: [
                { value: 1, title: 'Yes' },
                { value: 0, title: 'No' },
              ],
            },
          },
          {
            id: 'status',
            title: 'Product Status',
            type: 'select2',
            typeOptions: {
              multiselect: false,
              values: [
                { value: 1, title: 'Active' },
                { value: 0, title: 'Inactive' },
              ],
            },
          },
        ],
      },
      'Group',
    ),
    logActions: console.log,
  },
});
