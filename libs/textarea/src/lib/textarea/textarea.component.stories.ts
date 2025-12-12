import { Meta, moduleMetadata } from '@storybook/angular';
import { TextareaModule } from '../textarea.module';
import { TextareaComponent } from './textarea.component';

export default {
    title: 'TextareaComponent',
    component: TextareaComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [TextareaModule],
        }),
    ],
    parameters: {
        controls: {
            include: ['name', 'value', 'disabled', 'placeholder', 'rows', 'cols', 'attrs', 'spyId', 'autoSize'],
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
            description: 'Current textarea value',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '""' },
                category: 'Inputs',
            },
        },
        placeholder: {
            control: { type: 'text' },
            description: 'Placeholder text displayed when textarea is empty',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'undefined' },
                category: 'Inputs',
            },
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Disables the textarea preventing user interaction',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Inputs',
            },
        },
        rows: {
            control: { type: 'number' },
            description: 'Number of visible text rows',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '4' },
                category: 'Inputs',
            },
        },
        cols: {
            control: { type: 'number' },
            description: 'Number of visible text columns',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '4' },
                category: 'Inputs',
            },
        },
        autoSize: {
            control: { type: 'boolean' },
            description: 'Enables automatic height adjustment based on content (can be boolean or object with minRows/maxRows)',
            table: {
                type: { summary: 'boolean | TextareaAutoSize' },
                defaultValue: { summary: 'true' },
                category: 'Inputs',
            },
        },
        name: {
            control: { type: 'text' },
            description: 'Name attribute for the textarea element',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'undefined' },
                category: 'Inputs',
            },
        },
        spyId: {
            control: { type: 'text' },
            description: 'Custom ID for the textarea element',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'undefined' },
                category: 'Inputs',
            },
        },
        attrs: {
            control: { type: 'object' },
            description: 'Additional HTML attributes to apply to the textarea element',
            table: {
                type: { summary: 'Record<string, string>' },
                defaultValue: { summary: '{}' },
                category: 'Inputs',
            },
        },
        valueChange: {
            description: 'Emits when textarea value changes',
            table: {
                type: { summary: 'EventEmitter<any>' },
                category: 'Outputs',
            },
        },
    },
    args: {
        name: 'textarea-name',
        spyId: 'textarea-id',
        placeholder: 'Some placeholder',
        rows: 4,
        cols: 4,
        disabled: false,
        attrs: {
            title: 'Some title',
        },
    },
} as Meta;

export const primary = (args) => ({
    props: args,
});
