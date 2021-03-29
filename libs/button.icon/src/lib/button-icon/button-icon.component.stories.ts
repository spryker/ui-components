import { boolean, select } from '@storybook/addon-knobs';
import { ButtonIconModule } from '../button-icon.module';
import { ButtonIconComponent } from './button-icon.component';
import { ButtonSize } from '@spryker/button'
import { IconPlusModule } from '@spryker/icon/icons';

export default {
  title: 'ButtonIconComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [ButtonIconModule, IconPlusModule],
  },
  component: ButtonIconComponent,
  props: {
    size: select('Size', ButtonSize, ButtonSize.Large),
    iconName: IconPlusModule.icon,
    disabled: boolean('Disabled', false),
  },
});
