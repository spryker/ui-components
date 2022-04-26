import { Meta } from '@storybook/angular';
import { LogoModule } from '../logo.module';
import { LogoComponent } from './logo.component';

export default {
  title: 'LogoComponent',
  component: LogoComponent,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=3228%3A11344',
      allowFullscreen: true,
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
    },
  },
} as Meta;

export const primary = (args) => ({
  props: args,
  moduleMetadata: {
    imports: [LogoModule],
  },
  template: `
    <div style="width: 100px; height: 70px;">
      <spy-logo [size]="size"></spy-logo>
    </div>
  `,
});
