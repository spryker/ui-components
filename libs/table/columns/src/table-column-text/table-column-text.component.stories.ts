import { object } from '@storybook/addon-knobs';
import { IStory } from '@storybook/angular';

import { TableColumnTextComponent } from './table-column-text.component';
import { TableColumnTextModule } from './table-column-text.module';

export default {
  title: 'TableColumnText',
};

export const withFeatures = (): IStory => ({
  moduleMetadata: {
    imports: [TableColumnTextModule],
  },
  component: TableColumnTextComponent,
  props: {
    config: object('Config', {
      text: '${value}',
    }),
    context: object('Context', {
      value: 'Dynamic text',
    }),
  },
});
