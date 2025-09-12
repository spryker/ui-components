import { Component, importProvidersFrom, inject } from '@angular/core';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { DrawerModule, DrawerService, DrawerContainerProxyComponent } from '@spryker/drawer';
import { ButtonModule } from '@spryker/button';
import { ButtonActionModule } from '@spryker/button.action';
import { ActionsModule } from '@spryker/actions';
import { CloseDrawerActionHandlerService } from './close-drawer-action-handler.service';

@Component({
    standalone: false,
    selector: 'spy-story',
    template: ` <spy-button variant="primary" size="md" (click)="clickHandler()"> Open drawer </spy-button> `,
})
class SimpleDrawerComponent {
    private drawerService = inject(DrawerService);

    clickHandler(): void {
        this.drawerService.openComponent(DrawerContentComponent);
    }
}

@Component({
    standalone: false,
    selector: 'spy-drawer-content',
    template: `
        <h3>Drawer content here...</h3>

        <spy-button-action [action]="{ type: 'close-drawer' }" variant="primary" size="md">
            Close Drawer Via Service
        </spy-button-action>
    `,
})
class DrawerContentComponent {}

export default {
    title: 'CloseDrawerActionHandlerService',
    decorators: [
        applicationConfig({
            providers: [
                importProvidersFrom(
                    ActionsModule.withActions({
                        'close-drawer': CloseDrawerActionHandlerService,
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
    props: args,
    template: `
    <spy-story></spy-story>
  `,
});
