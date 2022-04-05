import { Meta } from '@storybook/angular';
import { withDesign } from 'storybook-addon-designs';
import { TextareaComponent } from './textarea.component';
import { TextareaModule } from '../textarea.module';

export default {
  title: 'TextareaComponent',
  component: TextareaComponent,
  decorators: [withDesign],
  parameters: {
    controls: {
      include: [
        'name',
        'value',
        'disabled',
        'placeholder',
        'rows',
        'cols',
        'attrs',
        'spyId',
      ],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2055%3A9147',
      allowFullscreen: true,
    },
  },
  args: {
    name: 'textarea-name',
    spyId: 'textarea-id',
    placeholder: 'Some placeholder',
    attrs: {
      title: 'Some title',
    },
  },
} as Meta;

export const primary = (args) => ({
  props: args,
  moduleMetadata: {
    imports: [TextareaModule],
  },
});
