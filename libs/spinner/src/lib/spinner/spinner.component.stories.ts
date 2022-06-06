import { SpinnerComponent } from './spinner.component';
import { boolean, number, select } from '@storybook/addon-knobs';
import { SpinnerModule } from '../spinner.module';
import { SpinnerSize } from '../types';

export default {
    title: 'SpinnerComponent',
};

export const primary = () => ({
    moduleMetadata: {
        imports: [SpinnerModule],
    },
    template: `
    <spy-spinner
      [delay]="delay"
      [size]="size"
      [isSpinning]="isSpinning"
      [overlayContent]="overlayContent"
    >Content for loading</spy-spinner>
  `,
    props: {
        delay: number('Delay before appearing spinner (ms)', 100),
        size: select('Size', SpinnerSize, SpinnerSize.Default),
        isSpinning: boolean('Is spinning', true),
        overlayContent: boolean('Overlay content', false),
    },
});
