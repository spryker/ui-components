import { Component } from '@angular/core';
import { DrawerModule, DrawerService, DrawerContainerProxyComponent } from '@spryker/drawer';
import { ButtonModule } from '@spryker/button';
import { ButtonActionModule } from '@spryker/button.action';
import { ActionsModule } from '@spryker/actions';
import { WebComponentsModule } from '@spryker/web-components';
import { IStory } from '@storybook/angular';
import { object } from '@storybook/addon-knobs';
import { CloseDrawerActionHandlerService } from './close-drawer-action-handler.service';

export default {
  title: 'CloseDrawerActionHandlerService',
};

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

export const primary = (): IStory => ({
  moduleMetadata: {
    imports: [
      WebComponentsModule.forRoot(),
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
  props: {
    action: object('action', {
      type: 'close-drawer',
    }),
  },
});
