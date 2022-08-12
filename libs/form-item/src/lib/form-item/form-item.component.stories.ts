import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta } from '@storybook/angular';
import { InputModule } from '@spryker/input';
import { TextareaModule } from '@spryker/textarea';
import { AutocompleteModule } from '@spryker/autocomplete';
import { SelectModule } from '@spryker/select';
import { TreeSelectModule } from '@spryker/tree-select';
import { RadioModule } from '@spryker/radio';
import { FormItemModule } from '../form-item.module';
import { FormItemComponent } from './form-item.component';

export default {
    title: 'FormItemComponent',
    component: FormItemComponent,
    parameters: {
        controls: {
            include: [
                'error',
                'warning',
                'hint',
                'required',
                'noSpaces',
                'noLabel',
                'withErrorTitle',
                'prefix',
                'suffix',
                'outerPrefix',
                'outerSuffix',
                'autocomplete',
                'select',
                'treeSelect',
            ],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=303%3A632',
            allowFullscreen: true,
        },
    },
    argTypes: {
        error: {
            control: { type: 'text' },
        },
        warning: {
            control: { type: 'text' },
        },
        hint: {
            control: { type: 'text' },
        },
    },
    args: {
        error: 'Error message',
        withErrorTitle: true,
    },
} as Meta;

@NgModule({
    imports: [BrowserAnimationsModule, FormItemModule],
    exports: [FormItemModule, InputModule],
})
class StoryModule {}

export const primary = (args) => ({
    props: args,
    moduleMetadata: { imports: [StoryModule] },
    template: `
    <spy-form-item
      for="input-id1"
      [required]="required"
      [noSpaces]="noSpaces"
      [noLabel]="noLabel">
      Label
      <spy-input spyId="form-id1" control></spy-input>
    </spy-form-item>
    <spy-form-item
      for="input-id2"
      [required]="required"
      [noSpaces]="noSpaces"
      [noLabel]="noLabel"
      [error]="error"
      [withErrorTitle]="withErrorTitle">
      With error and error title
      <spy-input spyId="form-id2" control></spy-input>
    </spy-form-item>
    <spy-form-item
      for="input-id3"
      [required]="required"
      [noSpaces]="noSpaces"
      [noLabel]="noLabel"
      [warning]="warning">
      With warning
      <spy-input spyId="form-id3" control></spy-input>
    </spy-form-item>
    <spy-form-item
      for="input-id4"
      [required]="required"
      [noSpaces]="noSpaces"
      [noLabel]="noLabel"
      [hint]="hint">
      With hint
      <spy-input spyId="form-id4" control></spy-input>
    </spy-form-item>
  `,
});
primary.args = {
    warning: 'Warning message',
    hint: 'Hint message',
};

export const withPrefixAndSuffix = (args) => ({
    props: args,
    moduleMetadata: { imports: [StoryModule] },
    template: `
    <spy-form-item
      for="input-id1"
      [required]="required"
      [noSpaces]="noSpaces"
      [noLabel]="noLabel"
      [error]="error"
      [warning]="warning"
      [hint]="hint"
      [withErrorTitle]="withErrorTitle">
      With error prefix and suffix
      <spy-input spyId="form-id1" [prefix]="prefix" [suffix]="suffix" control></spy-input>
    </spy-form-item>
    <spy-form-item
      for="input-id2"
      [required]="required"
      [noSpaces]="noSpaces"
      [noLabel]="noLabel"
      [error]="error"
      [warning]="warning"
      [hint]="hint"
      [withErrorTitle]="withErrorTitle">
      With error outerPrefix and outerSuffix
      <spy-input spyId="form-id2" [outerPrefix]="outerPrefix" [outerSuffix]="outerSuffix" control></spy-input>
    </spy-form-item>
  `,
});
withPrefixAndSuffix.args = {
    prefix: 'P',
    suffix: 'S',
    outerPrefix: 'Prefix',
    outerSuffix: 'Suffix',
};

export const formWithErrors = (args) => ({
    moduleMetadata: {
        imports: [StoryModule, TextareaModule, AutocompleteModule, SelectModule, TreeSelectModule, RadioModule],
    },
    template: `
    <spy-form-item
      [required]="required"
      [noSpaces]="noSpaces"
      [noLabel]="noLabel"
      [error]="error"
      [withErrorTitle]="withErrorTitle">
      Input
      <spy-input type="text" control></spy-input>
    </spy-form-item>
    <spy-form-item
      [required]="required"
      [noSpaces]="noSpaces"
      [noLabel]="noLabel"
      [error]="error"
      [withErrorTitle]="withErrorTitle">
      Textarea
      <spy-textarea control></spy-textarea>
    </spy-form-item>
    <spy-form-item
      [required]="required"
      [noSpaces]="noSpaces"
      [noLabel]="noLabel"
      [error]="error"
      [withErrorTitle]="withErrorTitle">
      Autocomplete
      <spy-input control>
        <spy-autocomplete [options]="autocomplete"></spy-autocomplete>
      </spy-input>
    </spy-form-item>
    <spy-form-item
      [required]="required"
      [noSpaces]="noSpaces"
      [noLabel]="noLabel"
      [error]="error"
      [withErrorTitle]="withErrorTitle">
      Select
      <spy-select [options]="select" control></spy-select>
    </spy-form-item>
    <spy-form-item
      [required]="required"
      [noSpaces]="noSpaces"
      [noLabel]="noLabel"
      [error]="error"
      [withErrorTitle]="withErrorTitle">
      Tree-select
      <spy-tree-select [items]="treeSelect" control></spy-tree-select>
    </spy-form-item>
    <spy-form-item
      [required]="required"
      [noSpaces]="noSpaces"
      [noLabel]="noLabel"
      [error]="error"
      [withErrorTitle]="withErrorTitle">
      Radio-group
      <spy-radio-group [value]="'A'" control>
        <spy-radio [value]="'A'" hasError>Label A</spy-radio>
        <spy-radio [value]="'B'">Label B</spy-radio>
      </spy-radio-group>
    </spy-form-item>
  `,
    props: args,
});
formWithErrors.args = {
    autocomplete: [
        {
            value: 'Option 1',
            title: 'Option 1',
        },
        {
            value: 'Option 2',
            title: 'Option 2',
            isDisabled: true,
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
};
