import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { ContextPipe } from './context.pipe';
import { ContextOptions } from './context.service';

@NgModule({
  imports: [CommonModule],
  exports: [ContextPipe],
  declarations: [ContextPipe],
})
export class ContextModule {
  static withOptions(
    options: ContextOptions,
  ): ModuleWithProviders<ContextModule> {
    return {
      ngModule: ContextModule,
      providers: [{ provide: ContextOptions, useValue: options }],
    };
  }
}
