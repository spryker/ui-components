import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverModule } from '@spryker/popover';
import { IconModule } from '@spryker/icon';
import { IconUserModule } from '@spryker/icon/icons';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { UserMenuItemComponent } from './user-menu-item/user-menu-item.component';
import { UserMenuLinkComponent } from './user-menu-link/user-menu-link.component';

@NgModule({
  imports: [
    CommonModule,
    PopoverModule,
    IconModule,
    IconUserModule
  ],
  declarations: [UserMenuComponent, UserMenuItemComponent, UserMenuLinkComponent],
  exports: [UserMenuComponent, UserMenuItemComponent, UserMenuLinkComponent],
})
export class UserMenuModule {}
