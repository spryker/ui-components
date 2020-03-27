import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SelectModule } from '../select.module';
import { SelectComponent } from './select.component';
import { NgModule } from '@angular/core';

export default {
  title: 'SelectComponent',
};

@NgModule({
  imports: [BrowserAnimationsModule, SelectModule],
  exports: [],
})
class StoryModule {}

export const primary = () => ({
  moduleMetadata: { imports: [StoryModule] },
  component: SelectComponent,
  props: {
    options: ['Option 1', 'Option 2', 'Option 3'],
    placeholder: 'Select option...',
    value: '',
    valueChange: console.log,
  },
});

export const multiSelect = () => ({
  moduleMetadata: { imports: [StoryModule] },
  component: SelectComponent,
  props: {
    options: ['Option 1', 'Option 2', 'Option 3'],
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
