import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonLinkComponent } from './button-link.component';
import { ApplyAttrsModule } from '@spryker/utils';

@NgModule({
  declarations: [ButtonLinkComponent, ApplyAttrsModule],
  imports: [CommonModule],
  exports: [ButtonLinkComponent],
})
export class ButtonLinkModule {}
