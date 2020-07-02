import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocaleModule } from '@spryker/locale';
import { EN_LOCALE, EnLocaleModule } from '@spryker/locale/locales/en';

import { SelectModule } from '../select.module';
import { SelectComponent } from './select.component';

export default {
  title: 'SelectComponent',
};

@NgModule({
  imports: [
    BrowserAnimationsModule,
    SelectModule,
    LocaleModule.forRoot({ defaultLocale: EN_LOCALE }),
    EnLocaleModule,
  ],
  exports: [SelectComponent],
})
class StoryModule {}

export const primary = () => ({
  moduleMetadata: {
    imports: [StoryModule],
  },
  template: `
    <spy-select
      (valueChange)="valueChange()"
      [name]="name"
      [options]="options"
      [placeholder]="placeholder"
      value="2"
    ></spy-select>
  `,
  props: {
    options: [
      {
        value: '1',
        label: 'Option 1',
      },
      {
        value: '2',
        label: 'Option 2',
      },
      {
        value: '3',
        label: 'Option 3',
      },
    ],
    placeholder: 'Option option...',
    name: 'some-name',
    valueChange: console.log,
  },
});

export const multiSelect = () => ({
  moduleMetadata: { imports: [StoryModule] },
  component: SelectComponent,
  props: {
    options: [
      'Option 1',
      'Option 2',
      'Option 3',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    ],
    placeholder: 'Select option...',
    multiple: true,
  },
});

export const withSearch = () => ({
  moduleMetadata: { imports: [StoryModule] },
  component: SelectComponent,
  props: {
    options: ['Option 1', 'Option 2', 'Option 3'],
    placeholder: 'Select option...',
    search: true,
  },
});

export const disabled = () => ({
  moduleMetadata: { imports: [StoryModule] },
  component: SelectComponent,
  props: {
    options: ['Option 1', 'Option 2', 'Option 3'],
    placeholder: 'Select option...',
    disabled: true,
  },
});

export const withSelectAll = () => ({
  moduleMetadata: { imports: [StoryModule] },
  component: SelectComponent,
  props: {
    options: ['Option 1', 'Option 2', 'Option 3'],
    placeholder: 'Select option...',
    multiple: true,
    showSelectAll: true,
    selectAllTitle: 'Select All',
  },
});
