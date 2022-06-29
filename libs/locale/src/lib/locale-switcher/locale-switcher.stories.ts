import { Meta } from '@storybook/angular';
import DeLocaleModule, { DE_LOCALE } from '@spryker/locale/locales/de';
import EnLocaleModule, { EN_LOCALE } from '@spryker/locale/locales/en';
import { LocaleModule } from '../locale.module';

const locales = { English: EN_LOCALE, German: DE_LOCALE };

export default {
  title: 'LocaleSwitcherComponent',
  argTypes: {
    locale: {
      control: { type: 'select' },
      options: locales,
    },
  },
  args: {
    locale: locales.English,
  },
} as Meta;

export const primary = (args) => ({
  props: {
    ...args,
    now: Date.now(),
  },
  moduleMetadata: {
    imports: [LocaleModule.forRoot(), EnLocaleModule, DeLocaleModule],
  },
  template: `
    <spy-locale-switcher [locale]="locale"></spy-locale-switcher>
    <p *spyLocaleRender>Date: {{ now | date:'medium' }}</p>
  `,
});
