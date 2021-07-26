import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputPasswordComponent } from './input-password/input-password.component';
import { InputModule } from '@spryker/input';
import { IconModule } from '@spryker/icon';
import { IconOpenEyeModule, IconCrossedEyeModule } from '@spryker/icon/icons';

@NgModule({
  imports: [
    CommonModule,
    InputModule,
    IconModule,
    IconOpenEyeModule,
    IconCrossedEyeModule,
  ],
  declarations: [InputPasswordComponent],
  exports: [InputPasswordComponent],
})
export class InputPasswordModule {}
