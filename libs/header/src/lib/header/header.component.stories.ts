import { Meta } from '@storybook/angular';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { withDesign } from 'storybook-addon-designs';
import { HeaderModule } from '../header.module';

export default {
  title: 'HeaderComponent',
  decorators: [withDesign],
  parameters: {
    controls: { hideNoControlsWarning: true },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2207%3A6829',
      allowFullscreen: true,
    },
  },
} as Meta;

export const primary = (args) => ({
  props: args,
  moduleMetadata: {
    imports: [HeaderModule, NzLayoutModule],
  },
  template: `
    <spy-header>
      Header Content
    </spy-header>
  `,
});
