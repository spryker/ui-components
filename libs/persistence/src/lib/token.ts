import { InjectionToken, Provider } from '@angular/core';

import { PersistenceStrategyTypesDeclaration } from './types';

export const PersistenceStrategyTypesToken = new InjectionToken<
  PersistenceStrategyTypesDeclaration[]
>('PersistenceStrategyTypesToken');

export function providePersistenceStrategies(
  strategies: PersistenceStrategyTypesDeclaration,
): Provider {
  return {
    provide: PersistenceStrategyTypesToken,
    useValue: strategies,
    multi: true,
  };
}
