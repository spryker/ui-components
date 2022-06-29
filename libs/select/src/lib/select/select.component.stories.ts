import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta } from '@storybook/angular';
import { LocaleModule } from '@spryker/locale';
import { EN_LOCALE, EnLocaleModule } from '@spryker/locale/locales/en';
import { SelectModule } from '../select.module';
import { SelectComponent } from './select.component';

export default {
  title: 'SelectComponent',
  component: SelectComponent,
  parameters: {
    controls: {
      include: [
        'options',
        'value',
        'search',
        'disabled',
        'multiple',
        'placeholder',
        'showSelectAll',
        'selectAllTitle',
        'name',
        'noOptionsText',
        'disableClear',
      ],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2055%3A9152',
      allowFullscreen: true,
    },
  },
  argTypes: {
    placeholder: {
      control: { type: 'text' },
    },
    value: {
      control: { type: 'text' },
    },
  },
  args: {
    options: ['Option 1', 'Option 2', 'Option 3'],
    multiple: true,
    placeholder: 'Select option...',
    selectAllTitle: 'Select All',
    name: 'some-name',
    noOptionsText: 'No options',
  },
} as Meta;

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

export const primary = (args) => ({
  props: {
    ...args,
    valueChange: console.log,
  },
  moduleMetadata: { imports: [StoryModule] },
});
primary.args = {
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
  value: 'Option 1',
  multiple: false,
};

export const multiSelect = (args) => ({
  props: args,
  moduleMetadata: { imports: [StoryModule] },
});
multiSelect.args = {
  options: [
    'Option 1',
    'Option 2',
    'Option 3',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  ],
};

export const multiSelectWithoutOptionsMapping = (args) => ({
  props: args,
  moduleMetadata: { imports: [StoryModule] },
});
multiSelectWithoutOptionsMapping.args = {
  options: [
    { value: 1, title: 'Option 1' },
    { value: '2', title: 'Option 2' },
    { value: '3', title: 'Option 3' },
  ],
  value: [1, '2'],
};

export const withSelectAll = (args) => ({
  props: args,
  moduleMetadata: { imports: [StoryModule] },
});
withSelectAll.args = {
  showSelectAll: true,
};
