import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@spryker/icon';
import { IconMaximizeModule, IconMinimizeModule, IconRemoveModule } from '@spryker/icon/icons';
import { CustomElementBoundaryModule } from '@spryker/web-components';

import { DrawerWrapperComponent } from './drawer-wrapper.component';

@NgModule({
    imports: [
        CommonModule,
        IconModule,
        IconMaximizeModule,
        IconRemoveModule,
        IconMinimizeModule,
        CustomElementBoundaryModule,
    ],
    exports: [DrawerWrapperComponent],
    declarations: [DrawerWrapperComponent],
})
export class DrawerWrapperModule {}
