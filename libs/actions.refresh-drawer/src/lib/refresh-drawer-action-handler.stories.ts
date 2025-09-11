import { Component, importProvidersFrom } from '@angular/core';
import { DrawerModule, DrawerService, DrawerContainerProxyComponent } from '@spryker/drawer';
import { ButtonModule } from '@spryker/button';
import { ButtonActionModule } from '@spryker/button.action';
import { ActionsModule } from '@spryker/actions';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { RefreshDrawerActionHandlerService } from './refresh-drawer-action-handler.service';

@Component({
    standalone: false,
    selector: 'spy-story',
    template: ` <spy-button variant="primary" size="md" (click)="clickHandler()"> Open drawer </spy-button> `,
})
class SimpleDrawerComponent {
    constructor(private drawerService: DrawerService) {}

    clickHandler(): void {
        this.drawerService.openComponent(DrawerContentComponent);
    }
}

@Component({
    standalone: false,
    selector: 'spy-drawer-content',
    template: `
        <h3>Drawer content here...</h3>

        <spy-button-action [action]="{ type: 'refresh-drawer' }" variant="primary" size="md">
            Refresh Drawer Via Service
        </spy-button-action>
    `,
})
class DrawerContentComponent {}

export default {
    title: 'RefreshDrawerActionHandlerService',
    decorators: [
        applicationConfig({
            providers: [
                importProvidersFrom(
                    ActionsModule.withActions({
                        'refresh-drawer': RefreshDrawerActionHandlerService,
                    }),
                ),
            ],
        }),
        moduleMetadata({
            imports: [DrawerModule, ButtonModule, ButtonActionModule],
            declarations: [SimpleDrawerComponent, DrawerContentComponent],
            entryComponents: [DrawerContentComponent, DrawerContainerProxyComponent],
        }),
    ],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2082%3A8987',
            allowFullscreen: true,
        },
    },
} as Meta;
export const primary = (args) => ({
    props: {
        ...args,
        action: {
            type: 'refresh-drawer',
        },
    },
    template: `
    <spy-story></spy-story>
  `,
});
