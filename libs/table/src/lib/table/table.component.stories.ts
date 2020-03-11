import { HttpClientModule } from '@angular/common/http';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { LayoutFlatHostComponent } from '@orchestrator/layout';

import { TableModule } from '../table.module';

export default {
  title: 'TableComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [TableModule.forRoot(), HttpClientModule],
    providers: [
      {
        provide: ANALYZE_FOR_ENTRY_COMPONENTS,
        useValue: LayoutFlatHostComponent,
        multi: true,
      },
    ],
  },
  template: `
    <spy-table [config]="config">
      <div *colTpl="'name'; let name">Name is3: {{ name }}</div>
        <ng-template colTpl="name" let-name>Name is2: {{ name }}</ng-template>
        <div *colTpl="'sku'; let sku">sku {{ sku }}</div>
        <div *colTpl="'id3'; let row='row'">{{ row.name }} - {{ row.id3 }}</div>
    </spy-table>
  `,
  props: {
    config: {
      dataUrl: 'https://angular-recipe-24caa.firebaseio.com/data.json',
      colsUrl: 'https://angular-recipe-24caa.firebaseio.com/col.json',
      selectable: true,
    },
  },
});
