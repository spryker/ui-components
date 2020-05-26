import { ButtonLinkComponent } from './button-link.component';
import { ApplyAttrsModule } from '@spryker/utils';
import { select } from '@storybook/addon-knobs';
import { IStory } from '@storybook/angular';

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
    variant: select(
      'Variant',
      { Primary: 'primary', Secondary: 'secondary', Critical: 'critical' },
      'primary',
    ),
    size: select('Size', { Large: 'lg', Medium: 'md', Small: 'sm' }, 'lg'),
  },
});
