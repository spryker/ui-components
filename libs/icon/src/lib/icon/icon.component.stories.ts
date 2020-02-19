import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconComponent } from './icon.component';

export default {
  title: 'IconComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [NzIconModule],
  },
  component: IconComponent,
  props: {},
});
