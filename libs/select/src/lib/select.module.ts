import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconModule } from '@spryker/icon';
import {
  IconArrowDownModule,
  IconCheckboxCheckedModule,
  IconCheckboxUncheckedModule,
  IconCheckModule,
  IconRemoveModule,
} from '@spryker/icon/icons';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { SelectComponent } from './select/select.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NzSelectModule,
    IconModule,
    IconArrowDownModule,
    IconCheckModule,
    IconRemoveModule,
    IconCheckboxCheckedModule,
    IconCheckboxUncheckedModule,
  ],
  declarations: [SelectComponent],
  exports: [SelectComponent],
})
export class SelectModule {}
