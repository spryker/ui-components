import { Component, importProvidersFrom, inject } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { DrawerModule, DrawerRef, DrawerService } from '@spryker/drawer';
import { LocaleModule } from '@spryker/locale';
import { EN_LOCALE, EnLocaleModule } from '@spryker/locale/locales/en';
import { ModalModule } from '@spryker/modal';
import { UnsavedChangesModule } from '@spryker/unsaved-changes';
import { UnsavedChangesBrowserGuard } from '@spryker/unsaved-changes.guard.browser';
import { UnsavedChangesFormMonitorModule } from '@spryker/unsaved-changes.monitor.form';
import { UnsavedChangesDrawerGuardModule } from './unsaved-changes-drawer-guard.module';

@Component({
    standalone: false,
    selector: 'spy-drawer-content',
    template: `
        <form spyUnsavedChangesFormMonitor>
            <div>
                <input type="text" />
            </div>
            <button>Submit</button>
        </form>
    `,
})
class DrawerContentComponent {}

@Component({
    standalone: false,
    selector: 'spy-story',
    template: ` <button (click)="toggleDrawer()">Toggle drawer</button> `,
})
class StoryComponent {
    private drawerService = inject(DrawerService);

    private drawerRef?: DrawerRef;

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

export default {
    title: 'UnsavedChangesGuardDrawer',
    component: StoryComponent,
    decorators: [
        applicationConfig({
            providers: [
                provideAnimations(),
                importProvidersFrom(UnsavedChangesModule.forRoot()),
                importProvidersFrom(UnsavedChangesDrawerGuardModule.forRoot()),
                importProvidersFrom(UnsavedChangesModule.withGuard(UnsavedChangesBrowserGuard)),
                importProvidersFrom(ModalModule.forRoot()),
                importProvidersFrom(LocaleModule.forRoot({ defaultLocale: EN_LOCALE })),
                importProvidersFrom(EnLocaleModule),
            ],
        }),
        moduleMetadata({
            imports: [DrawerModule, UnsavedChangesFormMonitorModule],
            declarations: [StoryComponent, DrawerContentComponent],
        }),
    ],
    parameters: {
        controls: {
            include: [],
        },
    },
} as Meta;

export const primary = (args) => ({
    props: args,
});
