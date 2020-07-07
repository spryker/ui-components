import { boolean, select } from '@storybook/addon-knobs';

import { ButtonAjaxModule } from './button-ajax.module';

export default {
  title: 'ButtonAjaxComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [ButtonAjaxModule],
  },
  template: `
    <spy-button-ajax
      [size]="size"
      [url]="custom/path-1"
    >Button AJAX</spy-button-ajax>
  `,
  props: {
    size: select('Size', { Large: 'lg', Medium: 'md', Small: 'sm' }, 'lg'),
    url: select(
      'Url',
      {
        Default: 'custom/default-path',
        Alternative: 'custom/alternative-path',
      },
      'custom/default-path',
    ),
  },
});
