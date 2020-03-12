import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AlertModule } from '../alert.module';

export default {
  title: 'AlertComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [BrowserAnimationsModule, AlertModule],
  },
  template: `
    <spy-alert type="error">Some message</spy-alert>
  `,
  props: {},
});
