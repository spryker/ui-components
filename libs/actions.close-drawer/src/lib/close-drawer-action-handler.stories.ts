// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { object } from '@storybook/addon-knobs';
// import { ActionsModule } from '@spryker/actions';
// import { ButtonActionModule } from '@spryker/button.action';
// import { DrawerModule } from '@spryker/drawer';
// import { DrawerContainerProxyComponent } from '../../../drawer/src/lib/drawer-container/drawer-container-proxy.component';
//
// import { CloseDrawerActionHandlerService } from './close-drawer-action-handler.service';
//
// export default {
//   title: 'CloseDrawerActionHandlerService'
// }
//
// export const primary = () => ({
//   moduleMetadata: {
//     imports: [
//       BrowserAnimationsModule,
//       ButtonActionModule,
//       DrawerModule,
//       ActionsModule.withActions({
//         close_drawer: CloseDrawerActionHandlerService,
//       }),
//     ],
//     entryComponents: [DrawerContainerProxyComponent],
//   },
//   template: `
//     <spy-button-action
//       [action]="action"
//       variant="primary"
//       size="lg"
//     >
//       Close Drawer Via Service
//     </spy-button-action>
//
//     <spy-drawer
//       [isOpen]="true"
//     >
//       <h3>Drawer content</h3>
//     </spy-drawer>
//   `,
//   props: {
//     action: object('action', {
//       type: 'close_drawer',
//     })
//   }
// })

import { Component } from '@angular/core';
import { DrawerModule, DrawerService } from '@spryker/drawer';
import { NotificationModule } from '@spryker/notification';
import { ButtonActionComponent, ButtonActionModule } from '@spryker/button.action';
import { ActionsModule } from '@spryker/actions';
import { WebComponentsModule } from '@spryker/web-components';
import { IStory } from '@storybook/angular';
import { object } from '@storybook/addon-knobs';

import { DrawerContainerComponent } from '../../../drawer/src/lib/drawer-container/drawer-container.component';
import { CloseDrawerActionHandlerService } from './close-drawer-action-handler.service';
import { DrawerContainerProxyComponent } from '../../../drawer/src/lib/drawer-container/drawer-container-proxy.component';

export default {
  title: 'CloseDrawerActionHandlerService',
};

@Component({
  selector: 'spy-story',
  template: `
    <button (click)="clickHandler()">Toggle drawer</button>
    <spy-button-action
      [action]="action"
      variant="primary"
      size="lg"
    >
      Close Drawer Via Service
    </spy-button-action>
  `,
})
class SimpleDrawerComponent {
  action = {
    type: 'close_drawer',
  }

  constructor(private drawerService: DrawerService) {}

  clickHandler(): void {
    this.drawerService.openComponent(DrawerContentComponent);
  }
}

@Component({
  selector: 'spy-drawer-content',
  template: `
    <h3>Drawer content here...</h3>
  `,
})
class DrawerContentComponent {}

export const primary = (): IStory => ({
  moduleMetadata: {
    imports: [
      WebComponentsModule.forRoot(),
      DrawerModule,
      NotificationModule.forRoot(),
      ButtonActionModule,
      ActionsModule.withActions({
        close_drawer: CloseDrawerActionHandlerService,
      }),
    ],
    declarations: [SimpleDrawerComponent, DrawerContentComponent],
    entryComponents: [
      ButtonActionComponent,
      DrawerContainerComponent,
      DrawerContentComponent,
      DrawerContainerProxyComponent,
    ],
  },
  template: `
    <spy-story></spy-story>
  `,
  props: {
    action: object('action', {
      type: 'close_drawer',
    })
  }
});

