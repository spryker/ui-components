import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableModule } from '@spryker/table';
import { ContextModule } from '@spryker/utils';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { TableColumnDynamicComponent } from './table-column-dynamic.component';

@NgModule({
    imports: [CommonModule, ContextModule, TableModule, NzSpinModule],
    declarations: [TableColumnDynamicComponent],
    exports: [TableColumnDynamicComponent],
})
export class TableColumnDynamicModule {}
