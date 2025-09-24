import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OfTypePipeModule } from '@spryker/utils';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

import { FormItemComponent } from './form-item/form-item.component';

@NgModule({
    imports: [CommonModule, NzFormModule, NzInputModule, NzIconModule, OfTypePipeModule],
    declarations: [FormItemComponent],
    exports: [FormItemComponent],
})
export class FormItemModule {}
