import { Meta } from '@storybook/angular';
import { ChipsModule } from '../chips.module';
import { ChipsComponent } from './chips.component';

export default {
    title: 'ChipsComponent',
    component: ChipsComponent,
    tags: ['autodocs'],
    parameters: {
        controls: {
            include: ['color', 'maxWidth', 'text'],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2082%3A8968',
            allowFullscreen: true,
        },
    },
    argTypes: {
        color: {
            control: { type: 'select' },
            options: ['blue', 'green', 'yellow', 'orange', 'red', 'gray', 'gray-lighter'],
            description: 'Color variant of the chip (blue, green, yellow, orange, red, gray, gray-lighter)',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '"green"' },
                category: 'Inputs',
            },
        },
        maxWidth: {
            control: { type: 'text' },
            description: 'Maximum width of the chip (CSS value)',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '"145px"' },
                category: 'Inputs',
            },
        },
        text: {
            control: { type: 'text' },
            description: 'Text content displayed in the chip',
            table: {
                type: { summary: 'string' },
                category: 'Content',
            },
        },
    },
    args: {
        color: 'blue',
        text: 'Text',
        maxWidth: '',
    },
} as Meta;

export const primary = (args) => ({
    props: args,
    moduleMetadata: {
        imports: [ChipsModule],
    },
    template: `
    <spy-chips [color]="color">{{ text }}</spy-chips>
  `,
});
