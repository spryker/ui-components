import { Meta } from '@storybook/angular';
import { TagModule } from '../tag.module';

export default {
  title: 'TagComponent',
  parameters: {
    controls: {
      include: ['disabled', 'removable'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2252%3A7539',
      allowFullscreen: true,
    },
  },
  args: {
    disabled: false,
    removable: true,
  },
} as Meta;

export const primary = (args) => ({
  props: args,
  moduleMetadata: {
    imports: [TagModule],
  },
  template: `
    <spy-tag [removable]="removable" [disabled]="disabled">This is a tag</spy-tag>
  `,
});
