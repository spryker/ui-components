import { object } from '@storybook/addon-knobs';
import { IStory } from '@storybook/angular';

import { TableColumnDateComponent } from './table-column-date.component';
import { TableColumnDateModule } from './table-column-date.module';

export default {
  title: 'TableColumnDate',
};

export const withFeatures = (): IStory => ({
  moduleMetadata: {
    imports: [TableColumnDateModule],
  },
  component: TableColumnDateComponent,
  props: {
    config: object('Config', {
      date: '${value}',
      format: 'mediumDate',
    }),
    context: object('Context', {
      value: new Date('2020-01-01T17:25:00'),
    }),
  },
});
