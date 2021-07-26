import { Component, Input } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IStory, storiesOf } from '@storybook/angular';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

import { LocaleModule } from './locale.module';

// TODO(date-picker): Remove this style import when our date picker is used
import '!style-loader!css-loader!less-loader?javascriptEnabled!ng-zorro-antd/date-picker/style/entry.less';

@Component({
  // tslint:disable-next-line: component-selector
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
      <p>
        <!-- TODO(date-picker): Replace Ant with our date picker when built -->
        <nz-date-picker [(ngModel)]="date"></nz-date-picker>
      </p>
    </ng-container>
  `,
})
class LocaleStoryComponent {
  @Input() date: Date | number = Date.now();
  @Input() price = 100500;
}

function createStoryFor(locale: LocaleMeta): () => IStory {
  return () => ({
    moduleMetadata: {
      imports: [
        BrowserAnimationsModule,
        LocaleModule.forRoot(),
        locale.module,
        NzDatePickerModule,
      ],
    },
    component: LocaleStoryComponent,
  });
}

declare var require: any;

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

locales.forEach((locale) => {
  localeStories.add(locale.name, createStoryFor(locale));
});
