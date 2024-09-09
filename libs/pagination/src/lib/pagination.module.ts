import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { IconModule } from '@spryker/icon';
import { SelectModule } from '@spryker/select';
import { IconPaginationArrowModule, IconDoubleArrowRightModule, IconDotsModule } from '@spryker/icon/icons';

@NgModule({
    imports: [
        CommonModule,
        NzPaginationModule,
        IconModule,
        SelectModule,
        IconPaginationArrowModule,
        IconDoubleArrowRightModule,
        IconDotsModule,
    ],
    declarations: [PaginationComponent],
    exports: [PaginationComponent],
})
export class PaginationModule {}
