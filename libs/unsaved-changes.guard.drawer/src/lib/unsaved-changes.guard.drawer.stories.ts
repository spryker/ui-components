import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DrawerModule, DrawerRef, DrawerService } from '@spryker/drawer';
import { LocaleModule } from '@spryker/locale';
import { EN_LOCALE, EnLocaleModule } from '@spryker/locale/locales/en';
import { ModalModule } from '@spryker/modal';
import { UnsavedChangesModule } from '@spryker/unsaved-changes';
import { UnsavedChangesBrowserGuard } from '@spryker/unsaved-changes.guard.browser';
import { UnsavedChangesFormMonitorModule } from '@spryker/unsaved-changes.monitor.form';
import { IStory } from '@storybook/angular';

import { UnsavedChangesDrawerGuardModule } from './unsaved-changes-drawer-guard.module';

export default {
  title: 'UnsavedChangesGuardDrawer',
};

@Component({
  selector: 'spy-drawer-content',
  template: `
    <form spyUnsavedChangesFormMonitor>
      <input type="text" />
      <button>Submit</button>
    </form>
  `,
})
class DrawerContentComponent {}

@Component({
  selector: 'spy-story',
  template: `
    <button (click)="toggleDrawer()">Toggle drawer</button>
  `,
})
class StoryComponent {
  private drawerRef?: DrawerRef;

  constructor(private drawerService: DrawerService) {}

  toggleDrawer() {
    if (this.drawerRef) {
      this.drawerRef.close();
      this.drawerRef = undefined;
      return;
    }

    this.drawerRef = this.drawerService.openComponent(DrawerContentComponent);
    this.drawerRef.afterClosed().subscribe(() => (this.drawerRef = undefined));
  }
}

export const primary = (): IStory => ({
  moduleMetadata: {
    imports: [
      DrawerModule,
      UnsavedChangesFormMonitorModule,
      UnsavedChangesModule.forRoot(),
      UnsavedChangesDrawerGuardModule.forRoot(),
      UnsavedChangesModule.withGuard(UnsavedChangesBrowserGuard),
      ModalModule.forRoot(),
      BrowserAnimationsModule,
      LocaleModule.forRoot({ defaultLocale: EN_LOCALE }),
      EnLocaleModule,
    ],
    declarations: [StoryComponent, DrawerContentComponent],
  },
  component: StoryComponent,
});
