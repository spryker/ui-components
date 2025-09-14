import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { IconUserModule, IconSettingsModule, IconInfoModule } from '@spryker/icon/icons';
import { UserMenuModule } from '../user-menu.module';
import { UserMenuLinkType } from '../user-menu-link/user-menu-link.component';
import { UserMenuComponent } from './user-menu.component';

export default {
    title: 'UserMenuComponent',
    component: UserMenuComponent,
    decorators: [
        applicationConfig({
            providers: [provideAnimations()],
        }),
        moduleMetadata({
            imports: [UserMenuModule, IconUserModule, IconSettingsModule, IconInfoModule],
        }),
    ],
    parameters: {
        controls: {
            include: [
                'icon',
                'userMenuLinkTypeInput',
                'userMenuItemText',
                'profileUserMenuLinkText',
                'logoutUserMenuLinkText',
            ],
        },
    },
    argTypes: {
        userMenuLinkTypeInput: {
            control: { type: 'select' },
            options: Object.values(UserMenuLinkType),
        },
        icon: {
            control: { type: 'select' },
            options: [IconUserModule.icon, IconSettingsModule.icon, IconInfoModule.icon],
        },
    },
    args: {
        icon: IconUserModule.icon,
        userMenuLinkTypeInput: UserMenuLinkType.Danger,
        userMenuItemText: 'Hi, John Doe!',
        profileUserMenuLinkText: 'Profile',
        logoutUserMenuLinkText: 'Logout',
    },
} as Meta;

export const primary = (args) => ({
    props: args,
    template: `
    <spy-user-menu [icon]="icon">
      <spy-user-menu-item>{{ userMenuItemText }}</spy-user-menu-item>
      <a href="/profile"><spy-user-menu-link>{{ profileUserMenuLinkText }}</spy-user-menu-link></a>
      <a href="/logout"><spy-user-menu-link [type]="userMenuLinkTypeInput">{{ logoutUserMenuLinkText }}</spy-user-menu-link></a>
    </spy-user-menu>
  `,
});
