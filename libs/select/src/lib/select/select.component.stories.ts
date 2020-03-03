import { SelectComponent } from './select.component';
import { SelectModule } from '../select.module';
import { NzSelectModule } from 'ng-zorro-antd/select';

export default {
  title: 'SelectComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [NzSelectModule, SelectModule],
  },
  component: SelectComponent,
  props: {},
});
