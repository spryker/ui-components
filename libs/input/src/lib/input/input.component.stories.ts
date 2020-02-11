import { NzInputModule } from 'ng-zorro-antd/input';
import { InputComponent } from './input.component';

export default {
  title: 'InputComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [NzInputModule],
  },
  component: InputComponent,
  props: {},
});
