import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { ModalComponent } from './modal/modal.component';
import { ConfirmModalModule } from './strategies';
import { NzModalWrapperModule } from './wrappers';

@NgModule({
    imports: [CommonModule, NzModalWrapperModule, ConfirmModalModule],
    declarations: [ModalComponent],
    exports: [ModalComponent],
})
export class ModalModule {
    static forRoot(): ModuleWithProviders<ModalModule> {
        return {
            ngModule: ModalModule,
            providers: [NzModalWrapperModule.forRoot().providers ?? []],
        };
    }
}
