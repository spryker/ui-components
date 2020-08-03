import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { PopoverComponent } from './popover/popover.component';

@NgModule({
  imports: [CommonModule, NzPopoverModule],
  declarations: [PopoverComponent],
  exports: [PopoverComponent],
})
export class PopoverModule {}
