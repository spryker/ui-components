import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumnChipComponent } from './table-column-chip.component';
import { ContextModule } from '@spryker/utils';
import { ChipsModule } from '@spryker/chips';

@NgModule({
    imports: [CommonModule, ContextModule, ChipsModule],
    exports: [TableColumnChipComponent],
    declarations: [TableColumnChipComponent],
})
export class TableColumnChipModule {}
