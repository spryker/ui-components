import { ButtonLinkComponent } from './button-link.component';

export default {
  title: 'ButtonLinkComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [],
    declarations: [ButtonLinkComponent],
  },
  template: `
    <spy-button-link variant="primary" size="lg">Button</spy-button-link>
  `,
  props: {},
});
