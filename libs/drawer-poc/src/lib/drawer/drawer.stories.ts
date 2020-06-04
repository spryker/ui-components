import { Component } from '@angular/core';
import { boolean, text } from '@storybook/addon-knobs';
import { IStory } from '@storybook/angular';

import { DrawerContainerComponent } from '../drawer-container/drawer-container.component';
import { DrawerPocModule } from '../drawer-poc.module';
import { DrawerComponentInputs } from './drawer.component';

export default {
  title: 'DrawerComponent',
};

@Component({
  selector: 'spy-story',
  template: `
    <spy-drawer
      [(isOpen)]="openDrawer"
      [closeable]="closeable"
      [resizable]="resizable"
      [width]="width"
      [hasBackdrop]="hasBackdrop"
    >
      <h3>Drawer content here...</h3>
    </spy-drawer>
    <button (click)="openDrawer = !openDrawer">Toggle drawer</button>
  `,
})
class StoryComponent extends DrawerComponentInputs {
  openDrawer = false;
}

export const primary = (): IStory => ({
  moduleMetadata: {
    imports: [DrawerPocModule],
    entryComponents: [DrawerContainerComponent],
  },
  component: StoryComponent,
  props: {
    closeable: boolean('Closeable', true),
    resizable: boolean('Resizable', true),
    width: text('Width', '50%'),
    hasBackdrop: boolean('Has backdrop', false),
  },
});
