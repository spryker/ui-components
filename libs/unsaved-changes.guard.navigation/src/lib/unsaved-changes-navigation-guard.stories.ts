import { Component, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { LocaleModule } from '@spryker/locale';
import { EN_LOCALE, EnLocaleModule } from '@spryker/locale/locales/en';
import { ModalModule } from '@spryker/modal';
import { NavigationModule } from '@spryker/navigation';
import { UnsavedChangesModule } from '@spryker/unsaved-changes';
import { UnsavedChangesBrowserGuard } from '@spryker/unsaved-changes.guard.browser';
import { UnsavedChangesFormMonitorModule } from '@spryker/unsaved-changes.monitor.form';

import { UnsavedChangesGuardNavigationModule } from './unsaved-changes-navigation-guard.module';

@Component({
    standalone: false,
    selector: 'spy-content',
    template: `
        <spy-navigation [items]="items"></spy-navigation>
        <form spyUnsavedChangesFormMonitor>
            <input type="text" style="border: 1px solid red" />
            <button>Submit</button>
        </form>
    `,
})
class NavigationComponent {
    items = [];
}

export default {
    title: 'UnsavedChangesGuardNavigation',
    component: NavigationComponent,
    decorators: [
        applicationConfig({
            providers: [
                provideAnimations(),
                importProvidersFrom(UnsavedChangesModule.forRoot()),
                importProvidersFrom(UnsavedChangesModule.withGuard(UnsavedChangesBrowserGuard)),
                importProvidersFrom(UnsavedChangesGuardNavigationModule.forRoot()),
                importProvidersFrom(ModalModule.forRoot()),
                importProvidersFrom(LocaleModule.forRoot({ defaultLocale: EN_LOCALE })),
                importProvidersFrom(EnLocaleModule),
            ],
        }),
        moduleMetadata({
            imports: [NavigationModule, UnsavedChangesFormMonitorModule],
            declarations: [NavigationComponent],
        }),
    ],
    args: {
        items: [
            {
                title: 'Item1',
            },
            {
                title: 'Item1',
                url: 'google.com',
            },
            {
                title: 'Item1',
                url: 'google.com',
            },
        ],
    },
} as Meta;

export const primary = (args) => ({
    props: args,
});
