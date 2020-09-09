import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { ConfirmModalModule } from './strategies/confirm';
import { OverlayWrapperModule } from './wrappers/overlay/overlay-wrapper.module';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  imports: [CommonModule, OverlayWrapperModule, ConfirmModalModule],
  declarations: [ModalComponent],
  exports: [ModalComponent],
})
export class ModalModule {
  static forRoot(): ModuleWithProviders<ModalModule> {
    return {
      ngModule: ModalModule,
      providers: [OverlayWrapperModule.forRoot().providers ?? []],
    };
  }
}
