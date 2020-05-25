import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonLinkComponent } from './button-link.component';
import { ApplyAttrsModule } from '@spryker/utils';

@NgModule({
  imports: [CommonModule, ApplyAttrsModule],
  exports: [ButtonLinkComponent],
  declarations: [ButtonLinkComponent],
})
export class ButtonLinkModule {}
