import { Meta } from '@storybook/angular';
import { withDesign } from 'storybook-addon-designs';
import { LabelComponent } from './label.component';
import { LabelModule } from '../label.module';

export default {
  title: 'LabelComponent',
  component: LabelComponent,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=303%3A632',
      allowFullscreen: true,
    },
  },
  args: {
    for: 'id',
    labelText: 'Label content *',
  },
} as Meta;

export const primary = (args) => ({
  props: args,
  moduleMetadata: {
    imports: [LabelModule],
  },
  template: `
    <spy-label [for]="for">
        {{ labelText }}
    </spy-label>
  `,
});
