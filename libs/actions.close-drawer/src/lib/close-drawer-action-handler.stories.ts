import { Component } from '@angular/core';
import { Meta } from '@storybook/angular';
import { withDesign } from 'storybook-addon-designs';
import {
  DrawerModule,
  DrawerService,
  DrawerContainerProxyComponent,
} from '@spryker/drawer';
import { ButtonModule } from '@spryker/button';
import { ButtonActionModule } from '@spryker/button.action';
import { ActionsModule } from '@spryker/actions';
import { CloseDrawerActionHandlerService } from './close-drawer-action-handler.service';

export default {
  title: 'CloseDrawerActionHandlerService',
  decorators: [withDesign],
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2082%3A8987',
      allowFullscreen: true,
    },
  },
} as Meta;

@Component({
  selector: 'spy-story',
  template: `
    <spy-button variant="primary" size="md" (click)="clickHandler()">
      Open drawer
    </spy-button>
  `,
})
class SimpleDrawerComponent {
  constructor(private drawerService: DrawerService) {}

  clickHandler(): void {
    this.drawerService.openComponent(DrawerContentComponent);
  }
}

@Component({
  selector: 'spy-drawer-content',
  template: `
    <h3>Drawer content here...</h3>

    <spy-button-action
      [action]="{ type: 'close-drawer' }"
      variant="primary"
      size="md"
    >
      Close Drawer Via Service
    </spy-button-action>
  `,
})
class DrawerContentComponent {}

export const primary = (args) => ({
  props: args,
  moduleMetadata: {
    imports: [
      DrawerModule,
      ButtonModule,
      ButtonActionModule,
      ActionsModule.withActions({
        'close-drawer': CloseDrawerActionHandlerService,
      }),
    ],
    declarations: [SimpleDrawerComponent, DrawerContentComponent],
    entryComponents: [DrawerContentComponent, DrawerContainerProxyComponent],
  },
  template: `
    <spy-story></spy-story>
  `,
});
