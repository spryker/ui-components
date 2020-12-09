import { FormsModule } from '@angular/forms';
import { boolean } from '@storybook/addon-knobs';
import { NzRadioModule } from 'ng-zorro-antd/radio';

import { RadioComponent } from './radio.component';

export default {
  title: 'RadioComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [NzRadioModule, FormsModule],
    declarations: [RadioComponent],
  },
  template: `
    <spy-radio [disabled]="disabled" [hasError]="hasError">Label</spy-radio>
  `,
  props: {
    disabled: boolean('Disabled', false),
    hasError: boolean('Has Error', false),
  },
});
