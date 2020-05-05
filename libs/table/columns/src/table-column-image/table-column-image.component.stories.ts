import { object } from '@storybook/addon-knobs';
import { IStory } from '@storybook/angular';

import { TableColumnImageComponent } from './table-column-image.component';
import { TableColumnImageModule } from './table-column-image.module';

export default {
  title: 'TableColumnImageComponent',
};

export const withFeatures = (): IStory => ({
  moduleMetadata: {
    imports: [TableColumnImageModule],
  },
  component: TableColumnImageComponent,
  props: {
    config: object('Config', {
      src: '${value}',
    }),
    context: object('Context', {
      value: 'Dynamic url',
    }),
  },
});
