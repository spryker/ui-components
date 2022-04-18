import { Meta } from '@storybook/angular';
import { UnsavedChangesModule } from '@spryker/unsaved-changes';
import { UnsavedChangesBrowserGuard } from '@spryker/unsaved-changes.guard.browser';

import { UnsavedChangesFormMonitorModule } from './unsaved-changes-form-monitor.module';

export default {
  title: 'UnsavedChangesMonitorForm',
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
  },
} as Meta;

export const primary = () => ({
  moduleMetadata: {
    imports: [
      UnsavedChangesFormMonitorModule,
      UnsavedChangesModule.forRoot(),
      UnsavedChangesModule.withGuard(UnsavedChangesBrowserGuard),
    ],
  },
  template: `
    <form spyUnsavedChangesFormMonitor>
      <input type="text" style="border: 1px solid red" />

      <div spyUnsavedChangesFormMonitorBubbling>
        Prevented Bubbling
        <input type="text" style="border: 1px solid red" />
        <input type="text" style="border: 1px solid red" />
      </div>

      <button>Submit</button>
    </form>
  `,
});
