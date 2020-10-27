import { ANALYZE_FOR_ENTRY_COMPONENTS, Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocaleModule } from '@spryker/locale';
import { EN_LOCALE, EnLocaleModule } from '@spryker/locale/locales/en';
import { ModalModule, NzModalWrapperComponent } from '@spryker/modal';
import { NavigationModule } from '@spryker/navigation';
import { UnsavedChangesModule } from '@spryker/unsaved-changes';
import { UnsavedChangesBrowserGuard } from '@spryker/unsaved-changes.guard.browser';
import { UnsavedChangesFormMonitorModule } from '@spryker/unsaved-changes.monitor.form';
import { IStory } from '@storybook/angular';

import { UnsavedChangesGuardNavigationModule } from './unsaved-changes-navigation-guard.module';

export default {
  title: 'UnsavedChangesGuardNavigation',
};

@Component({
  selector: 'spy-content',
  template: `
    <spy-navigation [items]="items"></spy-navigation>
    <form spyUnsavedChangesFormMonitor>
      <input type="text" style="border: 1px solid red" />
      <button>Submit</button>
    </form>
  `,
})
class NavigationComponent {
  items = [
    {
      title: 'Item1',
    },
    {
      title: 'Item1',
      url: 'google.com',
    },
    {
      title: 'Item1',
      url: 'google.com',
    },
  ];
}

export const primary = (): IStory => ({
  moduleMetadata: {
    imports: [
      NavigationModule,
      UnsavedChangesFormMonitorModule,
      UnsavedChangesModule.forRoot(),
      UnsavedChangesModule.withGuard(UnsavedChangesBrowserGuard),
      UnsavedChangesGuardNavigationModule.forRoot(),
      ModalModule.forRoot(),
      BrowserAnimationsModule,
      LocaleModule.forRoot({ defaultLocale: EN_LOCALE }),
      EnLocaleModule,
    ],
    declarations: [NavigationComponent],
    providers: [
      {
        provide: ANALYZE_FOR_ENTRY_COMPONENTS,
        useValue: [NzModalWrapperComponent],
        multi: true,
      },
    ],
  },
  component: NavigationComponent,
});
