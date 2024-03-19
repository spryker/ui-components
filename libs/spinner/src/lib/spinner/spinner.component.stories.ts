import { Meta, moduleMetadata } from '@storybook/angular';
import { SpinnerModule } from '../spinner.module';
import { SpinnerSize } from '../types';
import { SpinnerComponent } from './spinner.component';

export default {
    title: 'SpinnerComponent',
    component: SpinnerComponent,
    decorators: [
        moduleMetadata({
            imports: [SpinnerModule],
        }),
    ],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2082%3A8981',
            allowFullscreen: true,
        },
    },
    argTypes: {
        size: {
            control: { type: 'select' },
            options: SpinnerSize,
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
