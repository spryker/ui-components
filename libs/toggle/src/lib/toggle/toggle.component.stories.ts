import { Meta } from '@storybook/angular';
import { ToggleComponent } from './toggle.component';
import { ToggleModule } from '../toggle.module';

export default {
  title: 'ToggleComponent',
  component: ToggleComponent,
  parameters: {
    controls: {
      include: ['value', 'disabled', 'name'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2890%3A11773',
      allowFullscreen: true,
    },
  },
  args: {
    name: 'toggle-name',
  },
} as Meta;

export const primary = (args) => ({
  props: args,
  moduleMetadata: {
    imports: [ToggleModule],
  },
});

export const withLabel = (args) => ({
  props: args,
  moduleMetadata: {
    imports: [ToggleModule],
  },
  template: `
    <spy-toggle [value]="value" [disabled]="disabled" [name]="name">Label</spy-toggle>
  `,
});
