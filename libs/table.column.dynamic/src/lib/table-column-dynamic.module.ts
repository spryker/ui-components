import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextModule } from '@spryker/utils';
import { TableModule } from '@spryker/table';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { TableColumnDynamicComponent } from './table-column-dynamic.component';

@NgModule({
    imports: [CommonModule, ContextModule, TableModule, NzSpinModule],
    declarations: [TableColumnDynamicComponent],
    exports: [TableColumnDynamicComponent],
})
export class TableColumnDynamicModule {}
