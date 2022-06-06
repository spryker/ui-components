import { boolean } from '@storybook/addon-knobs';

import { ButtonToggleModule } from './button-toggle.module';

export default {
    title: 'ButtonToggleComponent',
};

export const primary = () => ({
    moduleMetadata: {
        imports: [ButtonToggleModule],
    },
    template: `
    <spy-button-toggle
      [disabled]="disabled"
    >
        Open
    </spy-button-toggle>
  `,
    props: {
        disabled: boolean('Disabled', false),
    },
});
