import { importProvidersFrom } from '@angular/core';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { UnsavedChangesModule } from '@spryker/unsaved-changes';
import { UnsavedChangesBrowserGuard } from '@spryker/unsaved-changes.guard.browser';

import { UnsavedChangesFormMonitorModule } from './unsaved-changes-form-monitor.module';

export default {
    title: 'UnsavedChangesMonitorForm',
    decorators: [
        applicationConfig({
            providers: [
                importProvidersFrom(UnsavedChangesModule.forRoot()),
                importProvidersFrom(UnsavedChangesModule.withGuard(UnsavedChangesBrowserGuard)),
            ],
        }),
        moduleMetadata({
            imports: [UnsavedChangesFormMonitorModule],
        }),
    ],
} as Meta;

export const primary = (args) => ({
    props: args,
    template: `
    <form spyUnsavedChangesFormMonitor>
      Prevent submit after changes
      <div><input type="text" style="border: 1px solid red" /></div>

      <div spyUnsavedChangesFormMonitorBubbling>
        Prevented Bubbling
        <div><input type="text" style="border: 1px solid green" /></div>
        <div><input type="text" style="border: 1px solid green" /></div>
      </div>

      <button>Submit</button>
    </form>
  `,
});
