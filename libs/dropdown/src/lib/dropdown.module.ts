import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown/dropdown.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { IconModule } from '@spryker/icon';

@NgModule({
    imports: [CommonModule, NzDropDownModule, IconModule],
    exports: [DropdownComponent],
    declarations: [DropdownComponent],
})
export class DropdownModule {}
