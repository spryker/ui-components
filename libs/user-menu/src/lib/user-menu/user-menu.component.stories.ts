import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconUserModule } from '@spryker/icon/icons';
import { UserMenuModule } from '../user-menu.module';
import { UserMenuLinkType } from '../user-menu-link/user-menu-link.component';

export default {
  title: 'UserMenuComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [UserMenuModule, BrowserAnimationsModule, IconUserModule],
  },
  template: `
    <spy-user-menu [icon]="icon">
      <spy-user-menu-item>Hi, John Doe!</spy-user-menu-item>
      <a href="/profile"><spy-user-menu-link>Profile</spy-user-menu-link></a>
      <a href="/logout"><spy-user-menu-link [type]="type">Logout</spy-user-menu-link></a>
    </spy-user-menu>
  `,
  props: {
    icon: IconUserModule.icon,
    type: UserMenuLinkType.Danger,
  },
});
