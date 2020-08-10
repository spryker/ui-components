import { Component } from '@angular/core';
import { IStory } from '@storybook/angular';

import { DrawerRef } from '../drawer-ref';
import { DrawerModule } from '../drawer.module';
import { DrawerService } from '../drawer.service';
import { UnsavedChangesBrowserGuard } from './guard-browser';
import { UnsavedChangesModule } from './unsaved-changes.module';

export default {
  title: 'UnsavedChanges',
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
      UnsavedChangesModule.forRoot(),
      UnsavedChangesModule.withGuard(UnsavedChangesBrowserGuard),
    ],
    declarations: [StoryComponent, DrawerContentComponent],
  },
  component: StoryComponent,
});
