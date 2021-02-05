import { boolean, select } from '@storybook/addon-knobs';
import { IStory } from '@storybook/angular';

import { ButtonShape, ButtonSize, ButtonVariant } from '../button-core/types';
import { ButtonComponent } from './button.component';
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

export const primary = createButtonStory(() => ({
  variant: select('Variant', ButtonVariant, ButtonVariant.Primary),
  size: select('Size', ButtonSize, ButtonSize.Large),
  shape: select('Shape', ButtonShape, ButtonShape.Default),
  disabled: boolean('Disabled', false),
  loading: boolean('Loading', false),
}));

export const disabled = createButtonStory({ disabled: true });

export const loading = createButtonStory({ loading: true });

export const primaryLarge = createButtonStory({
  variant: ButtonVariant.Primary,
  size: ButtonSize.Large,
});
export const primaryMedium = createButtonStory({
  variant: ButtonVariant.Primary,
  size: ButtonSize.Medium,
});
export const primarySmall = createButtonStory({
  variant: ButtonVariant.Primary,
  size: ButtonSize.Small,
});

export const secondaryLarge = createButtonStory({
  variant: ButtonVariant.Secondary,
  size: ButtonSize.Large,
});
export const secondaryMedium = createButtonStory({
  variant: ButtonVariant.Secondary,
  size: ButtonSize.Medium,
});
export const secondarySmall = createButtonStory({
  variant: ButtonVariant.Secondary,
  size: ButtonSize.Small,
});

export const criticalLarge = createButtonStory({
  variant: ButtonVariant.Critical,
  size: ButtonSize.Large,
});
export const criticalMedium = createButtonStory({
  variant: ButtonVariant.Critical,
  size: ButtonSize.Medium,
});
export const criticalSmall = createButtonStory({
  variant: ButtonVariant.Critical,
  size: ButtonSize.Small,
});

export const link = createButtonStory({ variant: ButtonVariant.Link });

function createButtonStory(
  inputs: Partial<ButtonComponent> | (() => Partial<ButtonComponent>),
  content = 'Button Text',
): () => IStory {
  return () => ({
    moduleMetadata: { imports: [ButtonModule] },
    template: `
      <spy-button
        [type]="type"
        [shape]="shape"
        [variant]="variant"
        [size]="size"
        [disabled]="disabled"
        [loading]="loading"
        [attrs]="attrs"
      >${content}</spy-button>
    `,
    props: typeof inputs === 'function' ? inputs() : inputs,
  });
}
