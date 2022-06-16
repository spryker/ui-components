import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconModule } from '@spryker/icon';
import {
  IconArrowDownModule,
  IconCheckModule,
  IconRemoveModule,
} from '@spryker/icon/icons';
import { I18nModule } from '@spryker/locale';
import { JoinModule } from '@spryker/utils';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { SelectComponentsModule } from '@spryker/web-components';

import { SelectComponent } from './select/select.component';
import { OptionComponent } from './option/option.component';
import { SelectedOptionComponent } from './selected-option/selected-option.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NzSelectModule,
    I18nModule,
    IconModule,
    IconArrowDownModule,
    IconCheckModule,
    IconRemoveModule,
    JoinModule,
    SelectComponentsModule,
  ],
  declarations: [SelectComponent, OptionComponent, SelectedOptionComponent],
  exports: [SelectComponent, OptionComponent, SelectedOptionComponent],
})
export class SelectModule {}
