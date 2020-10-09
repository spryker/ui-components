import { ApplyAttrsModule } from '@spryker/utils';
import { select } from '@storybook/addon-knobs';
import { IStory } from '@storybook/angular';

import { ButtonSize, ButtonVariant } from '../button-core/types';
import { ButtonLinkComponent } from './button-link.component';

export default {
  title: 'ButtonLinkComponent',
};

export const primary = (): IStory => ({
  moduleMetadata: {
    imports: [ApplyAttrsModule],
    declarations: [ButtonLinkComponent],
  },
  template: `
    <spy-button-link [variant]="variant" [size]="size">Button</spy-button-link>
  `,
  props: {
    variant: select('Variant', ButtonVariant, ButtonVariant.Primary),
    size: select('Size', ButtonSize, ButtonSize.Large),
  },
});
