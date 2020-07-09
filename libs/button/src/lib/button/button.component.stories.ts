import { boolean, select } from '@storybook/addon-knobs';

import { ButtonModule } from './button.module';

export default {
  title: 'ButtonComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [ButtonModule],
  },
  template: `
    <spy-button
      [shape]="shape"
      [variant]="variant"
      [size]="size"
      [disabled]="disabled"
    >Button</spy-button>
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
