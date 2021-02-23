import { InputPasswordModule } from '../input-password.module';
import {boolean} from "@storybook/addon-knobs";
import { InputPasswordComponent } from './input-password.component';

export default {
  title: 'InputPasswordComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [InputPasswordModule],
  },
  component: InputPasswordComponent,
  props: {
    value: 'Password',
    disabled: boolean('Disabled', false),
    readOnly: boolean('ReadOnly', false),
  },
});

export const withOuterPrefix = () => ({
  moduleMetadata: {
    imports: [InputPasswordModule],
  },
  component: InputPasswordComponent,
  props: {
    outerPrefix: 'prefix',
    value: 'Password',
    disabled: boolean('Disabled', false),
    readOnly: boolean('ReadOnly', false),
  },
});

export const withOuterSuffix = () => ({
  moduleMetadata: {
    imports: [InputPasswordModule],
  },
  component: InputPasswordComponent,
  props: {
    outerSuffix: 'suffix',
    value: 'Password',
    disabled: boolean('Disabled', false),
    readOnly: boolean('ReadOnly', false),
  },
});
