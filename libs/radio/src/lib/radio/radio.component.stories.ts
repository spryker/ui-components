import { Meta, moduleMetadata } from '@storybook/angular';
import { RadioModule } from '../radio.module';
import { RadioComponent } from './radio.component';

export default {
    title: 'RadioComponent',
    component: RadioComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [RadioModule],
        }),
    ],
    parameters: {
        controls: {
            include: ['value', 'disabled', 'hasError'],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2001%3A9337',
            allowFullscreen: true,
        },
    },
    argTypes: {
        value: {
            control: { type: 'text' },
            description: 'Value associated with this radio button',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'undefined' },
                category: 'Inputs',
            },
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Disables the radio button',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Inputs',
            },
        },
        hasError: {
            control: { type: 'boolean' },
            description: 'Shows error state styling',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Inputs',
            },
        },
        selected: {
            description: 'Emits when radio button is selected',
            table: {
                type: { summary: 'EventEmitter<string>' },
                category: 'Outputs',
            },
        },
    },
    args: {
        value: 'some-value',
    },
} as Meta;

export const primary = (args) => ({
    props: args,
    template: `
    <spy-radio [disabled]="disabled" [hasError]="hasError" [value]="value">Label</spy-radio>
  `,
});
