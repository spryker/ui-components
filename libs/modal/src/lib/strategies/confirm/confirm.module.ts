import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from '@spryker/button';

import { ConfirmModalComponent } from './confirm.component';

@NgModule({
  imports: [CommonModule, ButtonModule],
  declarations: [ConfirmModalComponent],
  entryComponents: [ConfirmModalComponent],
})
export class ConfirmModalModule {}
