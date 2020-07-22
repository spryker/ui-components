import { TreeSelectComponent } from './tree-select.component';
import { TreeSelectModule } from '../tree-select.module';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocaleModule } from '@spryker/locale';
import { EN_LOCALE, EnLocaleModule } from '@spryker/locale/locales/en';

export default {
  title: 'TreeSelectComponent',
};

@NgModule({
  imports: [
    BrowserAnimationsModule,
    TreeSelectModule,
    LocaleModule.forRoot({ defaultLocale: EN_LOCALE }),
    EnLocaleModule,
  ],
})
class StoryModule {}

export const primary = () => ({
  moduleMetadata: { imports: [StoryModule] },
  component: TreeSelectComponent,
  props: {
    items: [
      {
        title: 'Option 1',
        value: 'Option 1',
        children: [
          { title: 'Option 7', value: 'Option 7' },
          { title: 'Option 8', value: 'Option 8' },
        ],
      },
      { title: 'Option 2', value: 'Option 2' },
      { title: 'Option 3', value: 'Option 3' },
      { title: 'Option 4', value: 'Option 4' },
      { title: 'Option 5', value: 'Option 5' },
      { title: 'Option 6', value: 'Option 6' },
    ],
    placeholder: 'Select option...',
    multiple: true,
    name: 'some-name',
    search: true,
    valueChange: console.log,
  },
});

export const withSearch = () => ({
  moduleMetadata: { imports: [StoryModule] },
  component: TreeSelectComponent,
  props: {
    items: [
      {
        title: 'Option 1',
        value: 'Option 1',
        children: [
          { title: 'Option 7', value: 'Option 7' },
          { title: 'Option 8', value: 'Option 8' },
        ],
      },
      { title: 'Option 2', value: 'Option 2' },
      { title: 'Option 3', value: 'Option 3' },
      { title: 'Option 4', value: 'Option 4' },
      { title: 'Option 5', value: 'Option 5' },
      { title: 'Option 6', value: 'Option 6' },
    ],
    placeholder: 'Select option...',
    search: true,
    valueChange: console.log,
  },
});

export const disabled = () => ({
  moduleMetadata: { imports: [StoryModule] },
  component: TreeSelectComponent,
  props: {
    items: [
      {
        title: 'Option 1',
        value: 'Option 1',
        children: [
          { title: 'Option 7', value: 'Option 7' },
          { title: 'Option 8', value: 'Option 8' },
        ],
      },
      { title: 'Option 2', value: 'Option 2' },
      { title: 'Option 3', value: 'Option 3' },
      { title: 'Option 4', value: 'Option 4' },
      { title: 'Option 5', value: 'Option 5' },
      { title: 'Option 6', value: 'Option 6' },
    ],
    placeholder: 'Select option...',
    disabled: true,
    valueChange: console.log,
  },
});
