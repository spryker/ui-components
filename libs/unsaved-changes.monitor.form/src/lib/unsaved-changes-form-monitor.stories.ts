import { UnsavedChangesModule } from '@spryker/unsaved-changes';
import { UnsavedChangesBrowserGuard } from '@spryker/unsaved-changes.guard.browser';
import { UnsavedChangesDrawerGuardModule } from '@spryker/unsaved-changes.guard.drawer';
import { IStory } from '@storybook/angular';

import { UnsavedChangesFormMonitorModule } from './unsaved-changes-form-monitor.module';

export default {
  title: 'UnsavedChangesMonitorForm',
};

export const primary = (): IStory => ({
  moduleMetadata: {
    imports: [
      UnsavedChangesFormMonitorModule,
      UnsavedChangesModule.forRoot(),
      UnsavedChangesDrawerGuardModule.forRoot(),
      UnsavedChangesModule.withGuard(UnsavedChangesBrowserGuard),
    ],
  },
  template: `
    <form spyUnsavedChangesFormMonitor>
      <input type="text" style="border: 1px solid red" />
      <button>Submit</button>
    </form>
  `,
});
