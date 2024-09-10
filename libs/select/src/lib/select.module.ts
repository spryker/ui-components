import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChipsModule } from '@spryker/chips';
import { IconModule } from '@spryker/icon';
import { IconArrowDownModule, IconCheckModule, IconRemoveModule } from '@spryker/icon/icons';
import { I18nModule } from '@spryker/locale';
import { TagModule } from '@spryker/tag';
import { JoinModule } from '@spryker/utils';
import { SelectComponentsModule } from '@spryker/web-components';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { OptionComponent } from './option/option.component';
import { SelectComponent } from './select/select.component';
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
        ChipsModule,
        SelectComponentsModule,
        TagModule,
    ],
    declarations: [SelectComponent, OptionComponent, SelectedOptionComponent],
    exports: [SelectComponent, OptionComponent, SelectedOptionComponent],
})
export class SelectModule { }
