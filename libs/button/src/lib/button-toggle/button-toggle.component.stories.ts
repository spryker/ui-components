import { boolean, select } from '@storybook/addon-knobs';

import { ButtonToggleModule } from './button-toggle.module';
import { IconModule } from "@spryker/icon";
import { IconSettingsModule } from "@spryker/icon/icons";

export default {
  title: 'ButtonToggleComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [ButtonToggleModule, IconModule, IconSettingsModule],
  },
  template: `
    <spy-button-toggle
      [disabled]="disabled"
    >
        <spy-icon name="settings"></spy-icon>
    </spy-button-toggle>
  `,
  props: {
    disabled: boolean('Disabled', false),
  },
});
