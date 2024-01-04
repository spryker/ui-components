import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonActionModule } from '@spryker/button.action';
import { ContextModule } from '@spryker/utils';
import { TableColumnButtonActionComponent } from './table-column-button-action.component';

@NgModule({
    imports: [CommonModule, ContextModule, ButtonActionModule],
    exports: [TableColumnButtonActionComponent],
    declarations: [TableColumnButtonActionComponent],
})
export class TableColumnButtonActionModule {}
