import { Meta } from '@storybook/angular';
import { withDesign } from 'storybook-addon-designs';
import { CheckboxComponent } from './checkbox.component';
import { CheckboxModule } from '../checkbox.module';

export default {
  title: 'CheckboxComponent',
  component: CheckboxComponent,
  decorators: [withDesign],
  parameters: {
    controls: {
      include: [
        'spyId',
        'checked',
        'disabled',
        'indeterminate',
        'required',
        'name',
        'attrs',
      ],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2001%3A9336',
      allowFullscreen: true,
    },
  },
  args: {
    spyId: 'some-id',
    name: 'some-name',
    attrs: {
      attr1: 'attr1',
    },
  },
} as Meta;

export const primary = (args) => ({
  props: args,
  moduleMetadata: {
    imports: [CheckboxModule],
  },
  template: `
    <spy-checkbox
      [spyId]="spyId"
      [name]="name"
      [attrs]="attrs"
    >Checkbox label</spy-checkbox>
  `,
});
