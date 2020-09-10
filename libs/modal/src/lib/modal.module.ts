import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { ConfirmModalModule } from './strategies/confirm';
import { NzModalWrapperModule } from './wrappers';
import { ModalComponent } from './modal/modal.component';

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
