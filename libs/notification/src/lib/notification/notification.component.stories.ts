import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationModule } from '../notification.module';
import { NotificationComponent } from './notification.component';

export default {
  title: 'NotificationComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [NotificationModule, NoopAnimationsModule],
  },
  template: `
    <spy-notification type="error" [closeable]="true">
      <span title>Title...</span>
      <span description>Description...</span>
    </spy-notification>
  `,
});
