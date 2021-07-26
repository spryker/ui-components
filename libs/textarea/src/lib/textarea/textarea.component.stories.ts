import { TextareaComponent } from './textarea.component';
import { TextareaModule } from '../textarea.module';

export default {
  title: 'TextareaComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [TextareaModule],
  },
  component: TextareaComponent,
  props: {
    name: 'some-name',
  },
});
