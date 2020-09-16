import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from '@spryker/button';
import { OfTypePipeModule } from '@spryker/utils';

import { ConfirmModalComponent } from './confirm.component';

@NgModule({
  imports: [CommonModule, ButtonModule, OfTypePipeModule],
  declarations: [ConfirmModalComponent],
  entryComponents: [ConfirmModalComponent],
})
export class ConfirmModalModule {}
