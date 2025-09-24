import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@spryker/icon';
import { InterceptionModule } from '@spryker/interception';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { NavigationComponent, NavigationComposerDirective } from './navigation/navigation.component';

@NgModule({
    imports: [CommonModule, NzMenuModule, IconModule, InterceptionModule],
    declarations: [NavigationComponent, NavigationComposerDirective],
    exports: [NavigationComponent, NavigationComposerDirective, InterceptionModule],
})
export class NavigationModule {}
