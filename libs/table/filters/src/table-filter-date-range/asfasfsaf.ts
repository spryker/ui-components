import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { object } from '@storybook/addon-knobs';
import { IStory } from '@storybook/angular';

import { TableFilterDateRangeComponent } from './table-filter-date-range.component';
import { TableFilterDateRangeModule } from './table-filter-date-range.module';

import { LocaleModule } from '@spryker/locale';
import { EnLocaleModule, EN_LOCALE } from '@spryker/locale/locales/en';

export default {
  title: 'TableFilterDateRangeComponent',
};

const mockDateRangeConfig = {
  type: 'date-range',
  typeOptions: {
    placeholderFrom: 'from',
    placeholderTo: 'to',
    format: 'yyyy-MM-dd',
  },
};

export const TableFilterDateRange = (): IStory => ({
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      TableFilterDateRangeModule,
      LocaleModule.forRoot({ defaultLocale: EN_LOCALE }),
      EnLocaleModule,
    ],
  },
  component: TableFilterDateRangeComponent,
  props: {
    config: object('Config', {
      ...mockDateRangeConfig,
      typeOptions: {
        ...mockDateRangeConfig.typeOptions,
      },
    }),
    value: { from: '2012-12-12', to: '2012-12-17' },
  },
});
