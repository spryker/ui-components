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

import { ColumnTypeOption, TableColumnTypeComponent } from '../column-type';
import { TableModule } from '../table.module';
import { TableColumnComponent, TableColumnContext } from './table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableColumnImageComponent } from '../../../columns/src/table-column-image/table-column-image.component';
import { TableColumnTextComponent } from '../../../columns/src/table-column-text/table-column-text.component';
import { TableColumnDateComponent } from 'libs/table/columns/src/table-column-date/table-column-date.component';

export default {
  title: 'TableComponent',
};

// Example of how column type registry may be extended
// declare module './table' {
//   interface TableColumnTypeRegistry {
//     test: TableColumnTestConfig;
//   }
// }

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
      TableModule.forRoot(),
      TableModule.withColumnComponents({
        test: TableColumnTestComponent,
        image: TableColumnImageComponent,
        text: TableColumnTextComponent,
        date: TableColumnDateComponent,
      } as any),
      BrowserAnimationsModule,
    ],
    declarations: [
      TableColumnTestComponent,
      TableColumnImageComponent,
      TableColumnTextComponent,
      TableColumnDateComponent,
    ],
    providers: [
      {
        provide: ANALYZE_FOR_ENTRY_COMPONENTS,
        useValue: [
          LayoutFlatHostComponent,
          TableColumnTestComponent,
          TableColumnImageComponent,
          TableColumnTextComponent,
          TableColumnDateComponent,
        ],
        multi: true,
      },
    ],
  },
  template: `
    <spy-table [config]="config" (actionTriggered)="logActions($event)">
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
        dataUrl: 'https://angular-recipe-24caa.firebaseio.com/data.json',
        columns: [
          { id: 'name', sortable: true, title: 'name', width: '20%' },
          { id: 'sku', sortable: true, title: 'sku', width: '20%' },
          { id: 'id3', sortable: true, title: 'id3' },
          {
            id: 'img',
            title: 'Image',
            type: 'image',
            typeOptions: { src: '123' },
          },
          {
            id: 'title',
            title: 'Title',
            type: 'text',
            typeOptions: { text: 'asfdasdfadsf' },
          },
          {
            id: 'date',
            title: 'Date',
            type: 'date',
            typeOptions: { date: new Date() },
          },
        ],
        selectable: true,
        fixHeader: '200px',
        rowActions: [
          { id: '1234', title: '123' },
          { id: '2345', title: '234' },
        ],
        pageSizes: [20, 40, 50],
      },
      'Group',
    ),
    logActions: console.log,
  },
});
