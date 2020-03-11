import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown/dropdown.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@NgModule({
  imports: [CommonModule, NzDropDownModule],
  exports: [DropdownComponent],
  declarations: [DropdownComponent],
})
export class DropdownModule {}
