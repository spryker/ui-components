import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputModule } from '@spryker/input';
import { TextareaModule } from '@spryker/textarea';
import { AutocompleteModule } from '@spryker/autocomplete';
import { SelectModule } from '@spryker/select';
import { TreeSelectModule } from '@spryker/tree-select';
import { RadioModule } from '@spryker/radio';
import { IStory } from '@storybook/angular';

import { FormItemModule } from '../form-item.module';

export default {
    title: 'FormItemComponent',
};

@NgModule({
    imports: [BrowserAnimationsModule],
    exports: [FormItemModule, InputModule],
})
class StoryModule {}

export const primary = () => ({
    moduleMetadata: { imports: [StoryModule] },
    template: `
    <spy-form-item for="input-id1">
      Label
      <spy-input spyId="form-id1" type="text" control></spy-input>
    </spy-form-item>
    <spy-form-item for="input-id2">
      Label
      <spy-input spyId="form-id2" type="text" control></spy-input>
    </spy-form-item>
  `,
});

export const withError = (): IStory => ({
    moduleMetadata: { imports: [StoryModule] },
    template: `
    <spy-form-item error="Error Message">
      Label
      <spy-input placeholder="Type here..." type="text" control></spy-input>
    </spy-form-item>
  `,
});

export const withErrorAndPrefix = (): IStory => ({
    moduleMetadata: { imports: [StoryModule] },
    template: `
    <spy-form-item error="Error Message">
      Label
      <spy-input prefix="P" placeholder="Type here..." type="text" control></spy-input>
    </spy-form-item>
  `,
});

export const withErrorAndOuterPrefix = (): IStory => ({
    moduleMetadata: { imports: [StoryModule] },
    template: `
    <spy-form-item error="Error Message">
      Label
      <spy-input outerPrefix="prefix" placeholder="Type here..." type="text" control></spy-input>
    </spy-form-item>
  `,
});

export const withErrorAndSuffix = (): IStory => ({
    moduleMetadata: { imports: [StoryModule] },
    template: `
    <spy-form-item error="Error Message">
      Label
      <spy-input suffix="S" placeholder="Type here..." type="text" control></spy-input>
    </spy-form-item>
  `,
});

export const withErrorAndOuterSuffix = (): IStory => ({
    moduleMetadata: { imports: [StoryModule] },
    template: `
    <spy-form-item error="Error Message">
      Label
      <spy-input outerSuffix="suffix" placeholder="Type here..." type="text" control></spy-input>
    </spy-form-item>
  `,
});

export const required = (): IStory => ({
    moduleMetadata: { imports: [StoryModule] },
    template: `
    <spy-form-item required>
      Label
      <spy-input placeholder="Type here..." type="text" control></spy-input>
    </spy-form-item>
  `,
});

export const noLabel = (): IStory => ({
    moduleMetadata: { imports: [StoryModule] },
    template: `
    <spy-form-item [noLabel]="true">
      Hidden label!
      <spy-input placeholder="Type here..." type="text" control></spy-input>
    </spy-form-item>
  `,
});

export const noSpaces = (): IStory => ({
    moduleMetadata: { imports: [StoryModule] },
    template: `
    <spy-form-item noSpaces>
      Label
      <spy-input type="text" control></spy-input>
    </spy-form-item>
    <spy-form-item noSpaces>
      Label
      <spy-input type="text" control></spy-input>
    </spy-form-item>
  `,
});

export const formWithErrors = (): IStory => ({
    moduleMetadata: {
        imports: [StoryModule, TextareaModule, AutocompleteModule, SelectModule, TreeSelectModule, RadioModule],
    },
    template: `
    <spy-form-item error="Error Message">
      Input
      <spy-input type="text" control></spy-input>
    </spy-form-item>
    <spy-form-item error="Error Message">
      Textarea
      <spy-textarea control></spy-textarea>
    </spy-form-item>
    <spy-form-item error="Error Message">
      Autocomplete
      <spy-input control>
        <spy-autocomplete [options]="autocomplete"></spy-autocomplete>
      </spy-input>
    </spy-form-item>
    <spy-form-item error="Error Message">
      Select
      <spy-select [options]="select" control></spy-select>
    </spy-form-item>
    <spy-form-item error="Error Message">
      Tree-select
      <spy-tree-select [items]="treeSelect" control></spy-tree-select>
    </spy-form-item>
    <spy-form-item error="Error Message">
      Radio-group
      <spy-radio-group [value]="'A'" control>
        <spy-radio [value]="'A'" hasError>Label A</spy-radio>
        <spy-radio [value]="'B'">Label B</spy-radio>
      </spy-radio-group>
    </spy-form-item>
  `,
    props: {
        autocomplete: [
            {
                value: 'Option 1',
                title: 'Option 1',
                isDisabled: false,
            },
            {
                value: 'Option 2',
                title: 'Option 2',
            },
            {
                value: 'Option 3',
                title: 'Option 3',
            },
        ],
        select: ['Option 1', 'Option 2', 'Option 3'],
        treeSelect: [
            {
                title: 'Option 1',
                value: 'Option 1',
                children: [
                    { title: 'Option 4', value: 'Option 4' },
                    { title: 'Option 5', value: 'Option 5' },
                ],
            },
            { title: 'Option 2', value: 'Option 2' },
            { title: 'Option 3', value: 'Option 3' },
        ],
    },
});
