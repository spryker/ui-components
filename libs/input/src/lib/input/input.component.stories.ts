import { InputComponent } from './input.component';
import { InputModule } from '../input.module';

export default {
  title: 'InputComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [InputModule],
  },
  component: InputComponent,
  props: {},
});
