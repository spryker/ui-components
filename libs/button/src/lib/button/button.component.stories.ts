import { boolean, select } from '@storybook/addon-knobs';

import { ButtonShape, ButtonSize, ButtonVariant } from '../button-core/types';
import { ButtonModule } from './button.module';

export default {
  title: 'ButtonComponent',
  parameters: {
    abstract: {
      url:
        'https://share.goabstract.com/06fcce27-bd5a-4151-92ab-64e49b8d5001?collectionLayerId=0dbe2190-2585-4964-94d5-13a746765cbd&mode=design',
    },
  },
};

export const primary = () => ({
  moduleMetadata: {
    imports: [ButtonModule],
  },
  template: `
    <spy-button
      [shape]="shape"
      [variant]="variant"
      [size]="size"
      [disabled]="disabled"
      [loading]="loading"
    ><span *ngIf="withIcon" icon>&copy;</span>Button</spy-button>
  `,
  props: {
    variant: select('Variant', ButtonVariant, ButtonVariant.Primary),
    size: select('Size', ButtonSize, ButtonSize.Large),
    shape: select('Shape', ButtonShape, ButtonShape.Default),
    disabled: boolean('Disabled', false),
    loading: boolean('Loading', false),
    withIcon: boolean('With icon', false),
  },
});
