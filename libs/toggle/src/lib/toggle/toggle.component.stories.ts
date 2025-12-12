import { Meta, moduleMetadata } from '@storybook/angular';
import { ToggleModule } from '../toggle.module';
import { ToggleComponent } from './toggle.component';

export default {
    title: 'ToggleComponent',
    component: ToggleComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [ToggleModule],
        }),
    ],
    parameters: {
        controls: {
            include: ['value', 'disabled', 'name'],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2890%3A11773',
            allowFullscreen: true,
        },
    },
    argTypes: {
        value: {
            control: { type: 'boolean' },
            description: 'Toggle state (on/off)',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Inputs',
            },
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Disables the toggle preventing user interaction',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Inputs',
            },
        },
        name: {
            control: { type: 'text' },
            description: 'Name attribute for the toggle input element',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'undefined' },
                category: 'Inputs',
            },
        },
        valueChange: {
            description: 'Emits when toggle state changes',
            table: {
                type: { summary: 'EventEmitter<boolean>' },
                category: 'Outputs',
            },
        },
    },
    args: {
        name: 'toggle-name',
        disabled: false,
        value: '',
    },
} as Meta;

export const primary = (args) => ({
    props: args,
});

export const withLabel = (args) => ({
    props: args,
    template: `
    <spy-toggle [value]="value" [disabled]="disabled" [name]="name">Label</spy-toggle>
  `,
});
