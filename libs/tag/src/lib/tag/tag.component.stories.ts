import { TagComponent } from './tag.component';
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
    <spy-tag [disabled]="disabled">This is a tag</spy-tag>
  `,
  props: {
    disabled: boolean('Disabled', false),
  },
});
