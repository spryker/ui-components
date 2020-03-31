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

export const disabledOn = () => ({
  moduleMetadata: {
    imports: [NzSwitchModule, ToggleModule],
  },
  component: ToggleComponent,
  props: {
    value: true,
    name: 'test-name',
    disabled: true,
  },
});

export const disabledOff = () => ({
  moduleMetadata: {
    imports: [NzSwitchModule, ToggleModule],
  },
  component: ToggleComponent,
  props: {
    name: 'test-name',
    disabled: true,
  },
});
