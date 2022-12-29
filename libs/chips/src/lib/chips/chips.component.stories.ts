import { Meta } from '@storybook/angular';
import { ChipsComponent } from './chips.component';
import { ChipsModule } from '../chips.module';

export default {
    title: 'ChipsComponent',
    component: ChipsComponent,
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
        },
    },
    args: {
        text: 'Text',
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
