import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { ModalWrapperFactoryToken } from '../../tokens';
import { ModalWrapperComponent } from './modal-wrapper.component';
import { OverlayModalWrapperFactory } from './modal-wrapper-factory';

@NgModule({
    imports: [CommonModule, OverlayModule],
    declarations: [ModalWrapperComponent],
})
export class OverlayWrapperModule {
    static forRoot(): ModuleWithProviders<OverlayWrapperModule> {
        return {
            ngModule: OverlayWrapperModule,
            providers: [
                {
                    provide: ModalWrapperFactoryToken,
                    useExisting: OverlayModalWrapperFactory,
                },
            ],
        };
    }
}
