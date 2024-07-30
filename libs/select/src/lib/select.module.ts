import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChipsModule } from '@spryker/chips';
import { IconModule } from '@spryker/icon';
import { IconArrowDownModule, IconCheckModule, IconRemoveModule } from '@spryker/icon/icons';
import { I18nModule } from '@spryker/locale';
import { JoinModule } from '@spryker/utils';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { SelectComponent } from './select/select.component';

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
        ChipsModule,
    ],
    declarations: [SelectComponent],
    exports: [SelectComponent],
})
export class SelectModule {}
