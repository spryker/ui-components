import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '@spryker/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { DropdownComponent } from './dropdown/dropdown.component';

@NgModule({
    imports: [CommonModule, NzDropDownModule, IconModule],
    exports: [DropdownComponent],
    declarations: [DropdownComponent],
})
export class DropdownModule {}
