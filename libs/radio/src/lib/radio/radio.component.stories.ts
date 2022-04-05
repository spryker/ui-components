import { Meta } from '@storybook/angular';
import { withDesign } from 'storybook-addon-designs';
import { RadioModule } from '../radio.module';
import { RadioComponent } from './radio.component';

export default {
  title: 'RadioComponent',
  component: RadioComponent,
  decorators: [withDesign],
  parameters: {
    controls: {
      include: ['value', 'disabled', 'hasError'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2001%3A9337',
      allowFullscreen: true,
    },
  },
  args: {
    value: 'some-value',
  },
} as Meta;

export const primary = (args) => ({
  props: args,
  moduleMetadata: {
    imports: [RadioModule],
  },
  template: `
    <spy-radio [disabled]="disabled" [hasError]="hasError" [value]="value">Label</spy-radio>
  `,
});
