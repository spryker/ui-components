import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverModule } from '@spryker/popover';
import { IconModule } from '@spryker/icon';
import { IconUserModule } from '@spryker/icon/icons';
import { UserMenuComponent } from './user-menu/user-menu.component';

@NgModule({
  imports: [
    CommonModule,
    PopoverModule,
    IconModule,
    IconUserModule
  ],
  declarations: [UserMenuComponent],
  exports: [UserMenuComponent],
})
export class UserMenuModule {}
