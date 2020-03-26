import { ToggleComponent } from './toggle.component';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { ToggleModule } from '../toggle.module';

export default {
  title: 'ToggleComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [NzSwitchModule, ToggleModule],
  },
  component: ToggleComponent,
  props: {
    name: 'test-name',
  },
});
