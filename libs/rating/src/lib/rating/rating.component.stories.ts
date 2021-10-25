import { RatingComponent } from './rating.component';
import { boolean, number } from '@storybook/addon-knobs';
import { RatingModule } from '../rating.module';

export default {
  title: 'RatingComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [RatingModule],
  },
  component: RatingComponent,
  props: {
    rating: number('Rating', 3.35),
    maxRating: number('Max rating', 5),
    allowHalf: boolean('Allow half', true),
    readOnly: boolean('Read only', false),
  },
});
