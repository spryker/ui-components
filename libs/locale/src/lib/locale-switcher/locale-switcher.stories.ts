import DeLocaleModule, { DE_LOCALE } from '@spryker/locale/locales/de';
import EnLocaleModule, { EN_LOCALE } from '@spryker/locale/locales/en';
import { select } from '@storybook/addon-knobs';
import { IStory } from '@storybook/angular';

import { LocaleModule } from '../locale.module';

export default {
  title: 'LocaleSwitcherComponent',
};

export const primary = (): IStory => ({
  moduleMetadata: {
    imports: [LocaleModule.forRoot(), EnLocaleModule, DeLocaleModule],
  },
  template: `
    <spy-locale-switcher [locale]="locale"></spy-locale-switcher>
    <p *spyLocaleRender>Date: {{ now | date:'medium' }}</p>
  `,
  props: {
    now: Date.now(),
    locale: select('Locale', { English: EN_LOCALE, German: DE_LOCALE }, 'en'),
  },
});
