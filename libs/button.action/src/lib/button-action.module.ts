import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '@spryker/button';
import { ActionsModule } from '@spryker/actions';
import { ButtonActionComponent } from './button-action/button-action.component';

@NgModule({
  imports: [CommonModule, ButtonModule, ActionsModule],
  declarations: [ButtonActionComponent],
  exports: [ButtonActionComponent],
})
export class ButtonActionModule {}
