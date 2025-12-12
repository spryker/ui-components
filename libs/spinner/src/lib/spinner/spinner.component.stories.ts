import { Meta, moduleMetadata } from '@storybook/angular';
import { SpinnerModule } from '../spinner.module';
import { SpinnerSize } from '../types';
import { SpinnerComponent } from './spinner.component';

export default {
    title: 'SpinnerComponent',
    component: SpinnerComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [SpinnerModule],
        }),
    ],
    parameters: {
        controls: {
            include: ['delay', 'size', 'isSpinning', 'overlayContent'],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2082%3A8981',
            allowFullscreen: true,
        },
    },
    argTypes: {
        delay: {
            control: { type: 'number' },
            description: 'Delay in milliseconds before showing spinner',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: 'undefined' },
                category: 'Inputs',
            },
        },
        size: {
            control: { type: 'select' },
            options: Object.values(SpinnerSize),
            description: 'Size variant of the spinner (default, small, large)',
            table: {
                type: { summary: 'SpinnerSize' },
                defaultValue: { summary: 'SpinnerSize.Default' },
                category: 'Inputs',
            },
        },
        isSpinning: {
            control: { type: 'boolean' },
            description: 'Controls whether spinner is actively spinning',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Inputs',
            },
        },
        overlayContent: {
            control: { type: 'boolean' },
            description: 'Shows spinner as overlay on top of content',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Inputs',
            },
        },
    },
    args: {
        delay: 200,
        size: SpinnerSize.Default,
        isSpinning: true,
        overlayContent: false,
    },
} as Meta;

export const primary = (args) => ({
    props: args,
    template: `
    <spy-spinner
      [delay]="delay"
      [size]="size"
      [isSpinning]="isSpinning"
      [overlayContent]="overlayContent"
    >Content for loading</spy-spinner>
  `,
});
