import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NotificationModule } from '../notification.module';

export default {
  title: 'NotificationComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [NotificationModule, BrowserAnimationsModule],
  },
  template: `
    <spy-notification type="error" [closeable]="true">
      <span title>Title...</span>
      <span description>Description...</span>
    </spy-notification>
  `,
});
