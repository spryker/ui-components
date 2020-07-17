import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonToggleComponent } from './button-toggle.component';
import { ApplyAttrsModule } from '@spryker/utils';
import { IconModule } from '@spryker/icon';
import { IconSettingsModule } from '@spryker/icon/icons';

@NgModule({
  declarations: [ButtonToggleComponent],
  imports: [CommonModule, ApplyAttrsModule, IconModule, IconSettingsModule],
  exports: [ButtonToggleComponent],
})
export class ButtonToggleModule {}
