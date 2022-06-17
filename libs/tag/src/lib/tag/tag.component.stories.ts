import { boolean } from '@storybook/addon-knobs';
import { TagModule } from '../tag.module';

export default {
  title: 'TagComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [TagModule],
  },
  template: `
    <spy-tag [removable]="removable" [disabled]="disabled">This is a tag</spy-tag>
  `,
  props: {
    disabled: boolean('Disabled', false),
    removable: boolean('Removable', false),
  },
});
