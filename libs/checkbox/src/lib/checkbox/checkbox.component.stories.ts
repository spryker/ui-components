import { Meta } from '@storybook/angular';
import { CheckboxComponent } from './checkbox.component';
import { CheckboxModule } from '../checkbox.module';

export default {
    title: 'CheckboxComponent',
    component: CheckboxComponent,
    tags: ['autodocs'],
    parameters: {
        controls: {
            include: ['spyId', 'checked', 'disabled', 'indeterminate', 'required', 'name', 'attrs'],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2001%3A9336',
            allowFullscreen: true,
        },
    },
    argTypes: {
        checked: {
            control: { type: 'boolean' },
            description: 'Checked state of the checkbox',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Inputs',
            },
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Disables the checkbox preventing user interaction',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Inputs',
            },
        },
        indeterminate: {
            control: { type: 'boolean' },
            description: 'Sets checkbox to indeterminate state (partially checked, useful for "select all" scenarios)',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Inputs',
            },
        },
        required: {
            control: { type: 'boolean' },
            description: 'Marks the checkbox as required',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Inputs',
            },
        },
        name: {
            control: { type: 'text' },
            description: 'Name attribute for the checkbox input element',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'undefined' },
                category: 'Inputs',
            },
        },
        spyId: {
            control: { type: 'text' },
            description: 'Custom ID for the checkbox element',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'undefined' },
                category: 'Inputs',
            },
        },
        attrs: {
            control: { type: 'object' },
            description: 'Additional HTML attributes to apply to the checkbox element',
            table: {
                type: { summary: 'Record<string, string>' },
                defaultValue: { summary: '{}' },
                category: 'Inputs',
            },
        },
        checkedChange: {
            description: 'Emits when checked state changes',
            table: {
                type: { summary: 'EventEmitter<boolean>' },
                category: 'Outputs',
            },
        },
    },
    args: {
        spyId: 'some-id',
        name: 'some-name',
        attrs: {
            attr1: 'attr1',
        },
    },
} as Meta;

export const primary = (args) => ({
    props: args,
    moduleMetadata: {
        imports: [CheckboxModule],
    },
    template: `
    <spy-checkbox
      [spyId]="spyId"
      [checked]="checked"
      [disabled]="disabled"
      [indeterminate]="indeterminate"
      [required]="required"
      [name]="name"
      [attrs]="attrs"
    >Checkbox label</spy-checkbox>
  `,
});
