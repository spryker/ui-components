import { boolean, select } from '@storybook/addon-knobs';

import { ButtonToggleModule } from './button-toggle.module';

export default {
  title: 'ButtonToggleComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [ButtonToggleModule],
  },
  template: `
    <spy-button-toggle
      [disabled]="disabled"
    >
    </spy-button-toggle>
  `,
  props: {
    variant: select(
      'Variant',
      { Primary: 'primary', Secondary: 'secondary', Critical: 'critical' },
      'primary',
    ),
    size: select(
      'Size',
      { Large: 'lg', Medium: 'md', Small: 'sm', ExtraSmall: 'xs' },
      'lg',
    ),
    shape: select(
      'Shape',
      { Default: 'default', Round: 'round', Circle: 'circle' },
      'default',
    ),
    disabled: boolean('Disabled', false),
  },
});
