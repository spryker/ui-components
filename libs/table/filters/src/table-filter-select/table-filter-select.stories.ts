import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { object, array, text } from '@storybook/addon-knobs';
import { IStory } from '@storybook/angular';

import { TableFilterSelectComponent } from './table-filter-select.component';
import { TableFilterSelectModule } from './table-filter-select.module';

export default {
  title: 'TableFilterSelect',
};

const mockSelectConfig = {
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
    ],
  },
};

export const TableFilterSelect = (): IStory => ({
  moduleMetadata: {
    imports: [BrowserAnimationsModule, TableFilterSelectModule],
  },
  component: TableFilterSelectComponent,
  props: {
    config: object('Config', mockSelectConfig),
    value: text('Value', 'value_1'),
  },
});

export const TableFilterSelectMultiple = (): IStory => ({
  moduleMetadata: {
    imports: [BrowserAnimationsModule, TableFilterSelectModule],
  },
  component: TableFilterSelectComponent,
  props: {
    config: object('Config', {
      ...mockSelectConfig,
      typeOptions: {
        ...mockSelectConfig.typeOptions,
        multiple: true,
      },
    }),
    value: array('Value', ['value_1', 'value_2']),
  },
});
