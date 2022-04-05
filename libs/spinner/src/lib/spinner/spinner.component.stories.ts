import { Meta } from '@storybook/angular';
import { withDesign } from 'storybook-addon-designs';
import { SpinnerSize } from '../types';
import { SpinnerComponent } from './spinner.component';
import { SpinnerModule } from '../spinner.module';

export default {
  title: 'SpinnerComponent',
  component: SpinnerComponent,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2082%3A8981',
      allowFullscreen: true,
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: SpinnerSize,
    },
  },
  args: {
    delay: 200,
    size: SpinnerSize.Default,
    isSpinning: true,
  },
} as Meta;

export const primary = (args) => ({
  props: args,
  moduleMetadata: {
    imports: [SpinnerModule],
  },
  template: `
    <spy-spinner
      [delay]="delay"
      [size]="size"
      [isSpinning]="isSpinning"
      [overlayContent]="overlayContent"
    >Content for loading</spy-spinner>
  `,
});
