import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { provideCacheStrategies } from './token';
import { CacheStrategyTypesDeclaration } from './types';

@NgModule({
  imports: [CommonModule],
})
export class CacheModule {
  static withStrategies(
    strategies: CacheStrategyTypesDeclaration,
  ): ModuleWithProviders<CacheModule> {
    return {
      ngModule: CacheModule,
      providers: [provideCacheStrategies(strategies)],
    };
  }
}
