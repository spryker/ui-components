import { Meta, moduleMetadata } from '@storybook/angular';
import { InputModule } from '../input.module';
import { InputComponent } from './input.component';

export default {
    title: 'InputComponent',
    component: InputComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [InputModule],
        }),
    ],
    parameters: {
        controls: {
            include: [
                'name',
                'value',
                'type',
                'spyId',
                'placeholder',
                'outerPrefix',
                'outerSuffix',
                'prefix',
                'suffix',
                'readOnly',
                'disabled',
                'required',
                'attrs',
            ],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2055%3A9147',
            allowFullscreen: true,
        },
    },
    argTypes: {
        value: {
            control: { type: 'text' },
            description: 'Current input value',
            table: {
                type: { summary: 'any' },
                defaultValue: { summary: '""' },
                category: 'Inputs',
            },
        },
        type: {
            control: { type: 'text' },
            description: 'HTML input type attribute (text, number, email, password, etc.)',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '"text"' },
                category: 'Inputs',
            },
        },
        placeholder: {
            control: { type: 'text' },
            description: 'Placeholder text displayed when input is empty',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'undefined' },
                category: 'Inputs',
            },
        },
        name: {
            control: { type: 'text' },
            description: 'Name attribute for the input element',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'undefined' },
                category: 'Inputs',
            },
        },
        disabled: {
            control: 'boolean',
            description: 'Disables the input preventing user interaction',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Inputs',
            },
        },
        readOnly: {
            control: 'boolean',
            description: 'Makes the input read-only (value visible but not editable)',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Inputs',
            },
        },
        required: {
            control: 'boolean',
            description: 'Marks the input as required',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Inputs',
            },
        },
        prefix: {
            control: { type: 'text' },
            description: 'Content displayed as prefix inside the input (string or template)',
            table: {
                type: { summary: 'string | TemplateRef<void>' },
                defaultValue: { summary: '""' },
                category: 'Inputs',
            },
        },
        suffix: {
            control: { type: 'text' },
            description: 'Content displayed as suffix inside the input (string or template)',
            table: {
                type: { summary: 'string | TemplateRef<void>' },
                defaultValue: { summary: '""' },
                category: 'Inputs',
            },
        },
        outerPrefix: {
            control: { type: 'text' },
            description: 'Content displayed before the input wrapper (string or template)',
            table: {
                type: { summary: 'string | TemplateRef<void>' },
                defaultValue: { summary: '""' },
                category: 'Inputs',
            },
        },
        outerSuffix: {
            control: { type: 'text' },
            description: 'Content displayed after the input wrapper (string or template)',
            table: {
                type: { summary: 'string | TemplateRef<void>' },
                defaultValue: { summary: '""' },
                category: 'Inputs',
            },
        },
        spyId: {
            control: { type: 'text' },
            description: 'Custom ID for the input element',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'undefined' },
                category: 'Inputs',
            },
        },
        attrs: {
            control: { type: 'object' },
            description: 'Additional HTML attributes to apply to the input element',
            table: {
                type: { summary: 'Record<string, string>' },
                defaultValue: { summary: '{}' },
                category: 'Inputs',
            },
        },
        valueChange: {
            description: 'Emits when input value changes',
            table: {
                type: { summary: 'EventEmitter<any>' },
                category: 'Outputs',
            },
        },
    },
    args: {
        name: 'input-name',
        type: 'text',
        spyId: 'input-id',
        placeholder: 'Some placeholder',
        outerPrefix: '',
        outerSuffix: '',
        prefix: '',
        suffix: '',
        attrs: {
            title: 'Some title',
        },
    },
} as Meta;

export const primary = (args) => ({
    props: args,
});

export const withPrefixAndSuffix = (args) => ({
    props: args,
});
withPrefixAndSuffix.args = {
    prefix: 'P',
    suffix: 'S',
};

export const withOuterPrefixAndOuterSuffix = (args) => ({
    props: args,
});
withOuterPrefixAndOuterSuffix.args = {
    outerPrefix: 'prefix',
    outerSuffix: 'suffix',
};
