import { object, array } from '@storybook/addon-knobs';
import { IStory } from '@storybook/angular';

import { TableFilterSelectComponent } from './table-filter-select.component';
import { TableFilterSelectModule } from './table-filter-select.module';

export default {
  title: 'TableFilterSelect',
};

export const withFeatures = (): IStory => ({
  moduleMetadata: {
    imports: [TableFilterSelectModule],
  },
  component: TableFilterSelectComponent,
  props: {
    config: object('Config', {
      id: 'Filter Id',
      title: 'Filter title',
      type: 'select',
      typeOptions: {
        values: [
          {
            title: 'Option 1',
            value: 'value_1',
          },
          {
            title: 'Option 2',
            value: 'value_2',
          },
          {
            title: 'Option 3',
            value: 'value_3',
          },
        ]
      }
    }),
    context: array('Context', ['value_1']),
  },
});
