import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumnTextComponent } from './table-column-text.component';
import { ContextModule } from '@spryker/utils';

@NgModule({
    imports: [CommonModule, ContextModule],
    exports: [TableColumnTextComponent],
    declarations: [TableColumnTextComponent],
})
export class TableColumnTextModule {}
