import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonActionComponent } from './button-action/button-action.component';
import { ButtonModule } from '@spryker/button';
import { ActionsModule } from '@spryker/actions';

@NgModule({
  imports: [CommonModule, ButtonModule, ActionsModule],
  declarations: [ButtonActionComponent],
  exports: [ButtonActionComponent],
})
export class ButtonActionModule {}
