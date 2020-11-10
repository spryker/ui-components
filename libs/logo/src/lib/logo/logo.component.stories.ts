import { select } from '@storybook/addon-knobs';

import { LogoModule } from '../logo.module';

export default {
  title: 'LogoComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [LogoModule],
  },
  template: `
    <div style="width: 100px; height: 70px;">
      <spy-logo [size]="size"></spy-logo>
    </div>
  `,
  props: {
    size: select('Size', { Full: 'full', Icon: 'icon' }, 'full'),
  },
});
