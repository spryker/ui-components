import { ButtonModule } from './button.module';
import { select, boolean } from '@storybook/addon-knobs';

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
    size: select('Size', { Large: 'lg', Medium: 'md', Small: 'sm' }, 'lg'),
    shape: select(
      'Shape',
      { Default: 'default', Round: 'round', Circle: 'circle' },
      'default',
    ),
    disabled: boolean('Disabled', false),
  },
});
