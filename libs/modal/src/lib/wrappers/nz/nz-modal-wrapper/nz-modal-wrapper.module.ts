import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';

import { ModalWrapperFactoryToken } from '../../../tokens';
import { NzModalWrapperFactory } from '../nz-modal-wrapper-factory.service';
import { NzModalWrapperComponent } from './nz-modal-wrapper.component';

@NgModule({
  imports: [CommonModule, NzModalModule],
  declarations: [NzModalWrapperComponent],
  exports: [NzModalWrapperComponent],
})
export class NzModalWrapperModule {
  static forRoot(): ModuleWithProviders<NzModalWrapperModule> {
    return {
      ngModule: NzModalWrapperModule,
      providers: [
        {
          provide: ModalWrapperFactoryToken,
          useExisting: NzModalWrapperFactory,
        },
      ],
    };
  }
}
