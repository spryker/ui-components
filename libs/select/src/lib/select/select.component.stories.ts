import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta } from '@storybook/angular';
import { LocaleModule } from '@spryker/locale';
import { EN_LOCALE, EnLocaleModule } from '@spryker/locale/locales/en';
import { WebComponentsModule } from '@spryker/web-components';
import { SelectModule } from '../select.module';
import { SelectComponent } from './select.component';
import { OptionComponent } from '../option/option.component';
import { SelectedOptionComponent } from '../selected-option/selected-option.component';

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

export const withCustomContent = (args) => ({
  props: args,
  moduleMetadata: { imports: [StoryModule, SelectModule] },
  template: `
    <spy-select
        customOptionTemplate="true"
        [placeholder]="placeholder"
        [multiple]="multiple"
        [search]="search"
        [value]="'option1'"
    >
        <spy-option value="option1" title="Red text">
            <span style="color: red; font-weight: 400">Red text</span>
        </spy-option>
        <spy-option value="option2" title="Bold text" disabled>
            <span style="font-weight: 700">Bold text</span>
        </spy-option>
        <spy-option value="option3" title="Italic text">
            <span style="font-style: italic">Italic text</span>
        </spy-option>
        <spy-selected-option *ngIf="useCustomTemplate">
            <span before>before </span>
            <span after> after</span>
        </spy-selected-option>
    </spy-select>
  `,
});

withCustomContent.args = {
  multiple: false,
  search: false,
  useCustomTemplate: true,
  value: ['option1', 'option2'],
  placeholder: 'Select option...',
};

export const asWebComponents = () => ({
  moduleMetadata: {
    imports: [
      WebComponentsModule.forRoot(),
      WebComponentsModule.withComponents([
        { component: SelectComponent, isRoot: true },
        { component: OptionComponent },
        { component: SelectedOptionComponent },
      ]),
      SelectModule,
      BrowserAnimationsModule,
    ],
    entryComponents: [
      SelectComponent,
      OptionComponent,
      SelectedOptionComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  },
  template: `
    <web-spy-select custom-option-template="true">
      <web-spy-option value="option1" title="Red text">
          <span style="color: red; font-weight: 400">Red text</span>
      </web-spy-option>
      <web-spy-option value="option2" disabled="true" title="Bold text">
          <span style="font-weight: 700">Bold text</span>
      </web-spy-option>
      <web-spy-option value="option3" title="Italic text">
          <span style="font-style: italic">Italic text</span>
      </web-spy-option>
      <web-spy-selected-option selected>
          <span before>before </span>
          <span after> after</span>
      </web-spy-selected-option>
    </web-spy-select>
  `,
});
