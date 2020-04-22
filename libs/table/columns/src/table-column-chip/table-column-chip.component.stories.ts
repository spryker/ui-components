import { object } from '@storybook/addon-knobs';
import { IStory } from '@storybook/angular';

import { TableColumnChipComponent } from './table-column-chip.component';
import { TableColumnChipModule } from './table-column-chip.module';

export default {
  title: 'TableColumnChip',
};

export const withFeatures = (): IStory => ({
  moduleMetadata: {
    imports: [TableColumnChipModule],
  },
  component: TableColumnChipComponent,
  props: {
    config: object('Config', {
      text: '${value}',
      color: 'red',
    }),
    context: object('Context', {
      value: 'Value for testing',
    }),
  },
});
