import { ButtonLinkComponent } from './button-link.component';
import { ApplyAttrsModule } from '@spryker/utils';

export default {
  title: 'ButtonLinkComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [ApplyAttrsModule],
    declarations: [ButtonLinkComponent],
  },
  template: `
    <spy-button-link variant="secondary" size="lg">Button</spy-button-link>
  `,
  props: {},
});
