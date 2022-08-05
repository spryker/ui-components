import { Meta } from '@storybook/angular';
import { RatingComponent } from './rating.component';
import { RatingModule } from '../rating.module';

export default {
  title: 'RatingComponent',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2193%3A7667',
      allowFullscreen: true,
    },
  },
  args: {
    rating: 3.35,
    maxRating: 5,
    allowHalf: true,
    readOnly: false,
  },
} as Meta;

export const primary = (args) => ({
  props: args,
  moduleMetadata: {
    imports: [RatingModule],
  },
  component: RatingComponent,
});
