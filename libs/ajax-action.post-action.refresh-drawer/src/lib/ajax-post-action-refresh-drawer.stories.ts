import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { AjaxActionModule } from '@spryker/ajax-action';
import { ButtonAjaxComponent, ButtonAjaxModule } from '@spryker/button';
import { DrawerModule, DrawerService } from '@spryker/drawer';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';
import { NotificationModule } from '@spryker/notification';
import { WebComponentsModule } from '@spryker/web-components';
import { IStory } from '@storybook/angular';

import { DrawerContainerComponent } from '../../../drawer/src/lib/drawer-container/drawer-container.component';
import { AjaxPostActionRefreshDrawerService } from './ajax-post-action-refresh-drawer.service';

export default {
  title: 'AjaxPostActionRefreshDrawer',
};

const mockResponse = () => ({
  postActions: [
    {
      type: 'refresh_drawer',
    },
  ],
});

@Component({
  selector: 'spy-story',
  template: ` <button (click)="clickHandler()">Toggle drawer</button> `,
})
class SimpleDrawerComponent {
  constructor(private drowerService: DrawerService) {}

  clickHandler(): void {
    this.drowerService.openComponent(DrawerContentComponent);
  }
}

@Component({
  selector: 'spy-drawer-content',
  template: `
    <h3>Drawer content here...</h3>
    <spy-button-ajax url="/html-request">Button</spy-button-ajax>
  `,
})
class DrawerContentComponent {}

export const primary = (): IStory => ({
  moduleMetadata: {
    imports: [
      WebComponentsModule.forRoot(),
      DrawerModule,
      MockHttpModule,
      HttpClientTestingModule,
      NotificationModule.forRoot(),
      AjaxActionModule.withActions({
        refresh_drawer: AjaxPostActionRefreshDrawerService,
      }),
      ButtonAjaxModule,
    ],
    declarations: [SimpleDrawerComponent, DrawerContentComponent],
    entryComponents: [
      ButtonAjaxComponent,
      DrawerContainerComponent,
      DrawerContentComponent,
    ],
  },
  template: `
    <spy-story [mockHttp]="mockHttp"></spy-story>
  `,
  props: {
    mockHttp: setMockHttp([
      {
        url: '/html-request',
        dataFn: () => mockResponse(),
      },
    ]),
  },
});
