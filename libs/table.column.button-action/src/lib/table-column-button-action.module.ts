import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonActionModule } from '@spryker/button.action';
import { IconModule } from '@spryker/icon';
import { ContextModule } from '@spryker/utils';
import { TableColumnButtonActionComponent } from './table-column-button-action.component';

@NgModule({
    imports: [CommonModule, ContextModule, ButtonActionModule, IconModule],
    exports: [TableColumnButtonActionComponent],
    declarations: [TableColumnButtonActionComponent],
})
export class TableColumnButtonActionModule {}
