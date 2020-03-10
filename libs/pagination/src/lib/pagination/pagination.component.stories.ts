import { PaginationComponent } from './pagination.component';
import { PaginationModule } from '../pagination.module';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

export default {
  title: 'PaginationComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [PaginationModule, NzPaginationModule],
  },
  component: PaginationComponent,
  props: {},
});
