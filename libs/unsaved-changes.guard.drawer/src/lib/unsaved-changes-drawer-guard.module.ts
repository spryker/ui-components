import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { InterceptionModule } from '@spryker/interception';

import { UnsavedChangesDrawerGuardComposableFactory } from './unsaved-changes-drawer-guard.service';

@NgModule({
    imports: [CommonModule],
})
export class UnsavedChangesDrawerGuardModule {
    static forRoot(): ModuleWithProviders<UnsavedChangesDrawerGuardModule> {
        return {
            ngModule: UnsavedChangesDrawerGuardModule,
            providers: [InterceptionModule.withComposable(UnsavedChangesDrawerGuardComposableFactory).providers || []],
        };
    }
}
