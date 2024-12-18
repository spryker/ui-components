import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@spryker/icon';
import { IconArrowDownModule } from '@spryker/icon/icons';
import { ApplyContextsModule } from '@spryker/utils';
import { CustomElementBoundaryModule } from '@spryker/web-components';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
    imports: [
        CommonModule,
        NzLayoutModule,
        IconModule,
        IconArrowDownModule,
        CustomElementBoundaryModule,
        ApplyContextsModule,
    ],
    declarations: [SidebarComponent],
    exports: [SidebarComponent],
})
export class SidebarModule {}
