import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import {
  ContextSerializationStrategy,
  provideContextSerializationStrategies,
} from './serialization-strategy';
import { ArrayContextSerializationStrategy } from './serialization-strategies';

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

  static withSerializationStrategies(
    strategies: Type<ContextSerializationStrategy>[],
  ): ModuleWithProviders<ContextModule> {
    return {
      ngModule: ContextModule,
      providers: [provideContextSerializationStrategies(strategies)],
    };
  }
}
