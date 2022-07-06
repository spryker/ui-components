import { Component, Input } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IStory, storiesOf } from '@storybook/angular';

import { LocaleModule } from './locale.module';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'locale-story-component',
  styles: [
    `
      p {
        margin-bottom: 10px;
      }
    `,
  ],
  template: `
    <ng-container *spyLocaleRender>
      <p>Localized date: {{ date | date }}</p>
      <p>Localized time: {{ date | date: 'shortTime' }}</p>
      <p>Localized currency: {{ price | currency: 'EUR' }}</p>
    </ng-container>
  `,
})
class LocaleStoryComponent {
  @Input() date: Date | number = Date.now();
  @Input() price = 100500;
}

function createStoryFor(locale: LocaleMeta): (args) => IStory {
  return (args) => ({
    props: args,
    moduleMetadata: {
      imports: [BrowserAnimationsModule, LocaleModule.forRoot(), locale.module],
    },
  });
}

declare const require: any;

interface LocaleMeta {
  name: string;
  module: Function;
}

const localeModulesLoader = require.context(
  '../../locales',
  true,
  /src\/index\.ts$/,
);

const locales: LocaleMeta[] = localeModulesLoader.keys().map(
  (id: string) =>
    ({
      name: id.split('/')[1], // ID Format: ./[locale]/src/index.ts
      module: localeModulesLoader(id).default,
    } as LocaleMeta),
);

const localeStories = storiesOf('LocaleModule', module);
localeStories.addParameters({
  component: LocaleStoryComponent,
  argTypes: {
    date: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    date: Date.now(),
  },
});

locales.forEach((locale) => {
  localeStories.add(locale.name, createStoryFor(locale));
});
