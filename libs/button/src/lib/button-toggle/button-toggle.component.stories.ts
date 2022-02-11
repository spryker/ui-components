import { Meta } from '@storybook/angular';
import { withDesign } from 'storybook-addon-designs';
import { ButtonToggleComponent } from './button-toggle.component';
import { ButtonToggleModule } from './button-toggle.module';

export default {
  title: 'ButtonToggleComponent',
  component: ButtonToggleComponent,
  decorators: [withDesign],
  parameters: {
    controls: {
      include: ['disabled', 'toggled', 'attrs'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=1989%3A9334',
      allowFullscreen: true,
    },
  },
  args: {
    disabled: false,
    toggled: false,
    attrs: { name: 'custom-name' },
  },
} as Meta;

export const primary = (args) => ({
  props: args,
  moduleMetadata: {
    imports: [ButtonToggleModule],
  },
  template: `
    <spy-button-toggle
      [disabled]="disabled"
      [toggled]="toggled"
      [attrs]="attrs"
    >Open</spy-button-toggle>
  `,
});
