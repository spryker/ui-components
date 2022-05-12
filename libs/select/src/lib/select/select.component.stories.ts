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
})
class StoryModule {}

export const primary = () => ({
  moduleMetadata: { imports: [StoryModule] },
  component: SelectComponent,
  props: {
    options: [
      'Option 1',
      'Option 2',
      'Option 3',
      'Option 4',
      'Option 5',
      'Option 6',
      'Option 7',
      'Option 8',
      'Option 9',
      'Option 10',
    ],
    placeholder: 'Select option...',
    value: 'Option 1',
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

export const multiSelectWithoutOptionsMapping = () => ({
  moduleMetadata: { imports: [StoryModule] },
  component: SelectComponent,
  props: {
    options: [
      { value: 1, title: 'Option 1' },
      { value: '2', title: 'Option 2' },
      { value: '3', title: 'Option 3' },
    ],
    placeholder: 'Select option...',
    multiple: true,
    value: [1, '2'],
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

export const withCustomContent = () => ({
  moduleMetadata: { imports: [StoryModule, SelectModule] },
  template: `
    <spy-select [placeholder]="placeholder">
        <spy-option value="option1">
            <span style="color: red; font-weight: 400">Red text</span>
        </spy-option>
        <spy-option value="option2">
            <span style="font-weight: 700">Bold text</span>
        </spy-option>
    </spy-select>
  `,
  props: {
    value: ['option1', 'option2'],
    placeholder: 'Select option...',
  },
});
