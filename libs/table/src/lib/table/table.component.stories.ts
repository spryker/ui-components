import { TableComponent } from './table.component';
import { TableModule } from '../table.module';
import { HttpClientModule } from '@angular/common/http';

export default {
  title: 'TableComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [TableModule.forRoot(), HttpClientModule],
  },
  component: TableComponent,
  template: `
    <spy-table>
      <div *colTpl="'name'; let name">Name is3: {{ name }}</div>
        <ng-template colTpl="name" let-name>Name is2: {{ name }}</ng-template>
        <div *colTpl="'sku'; let sku">sku {{ sku }}</div>
        <div *colTpl="'id3'; let row='row'">{{ row.name }} - {{ row.id3 }}</div>
    </spy-table>
  `,
  props: {},
});
