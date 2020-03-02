import { TableComponent } from './table.component';
import { TableModule } from '../table.module';

export default {
  title: 'TableComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [TableModule],
  },
  component: TableComponent,
  props: {},
});
