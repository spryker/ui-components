import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { RenderTplComponent } from './render-tpl.component';
import { SLOT_PARENT_TAG, SlotDirective } from './slot.directive';

export interface SlotModuleOptions {
  parentTag: string;
}

@NgModule({
  imports: [CommonModule],
  exports: [SlotDirective],
  declarations: [SlotDirective, RenderTplComponent],
})
export class SlotModule {
  static configure(
    options: SlotModuleOptions,
  ): ModuleWithProviders<SlotModule> {
    return {
      ngModule: SlotModule,
      providers: [{ provide: SLOT_PARENT_TAG, useValue: options.parentTag }],
    };
  }
}
