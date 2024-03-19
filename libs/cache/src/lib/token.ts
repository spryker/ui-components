import { InjectionToken, Provider } from '@angular/core';

import { CacheStrategyTypesDeclaration } from './types';

export const CacheStrategyTypesToken = new InjectionToken<CacheStrategyTypesDeclaration[]>('CacheStrategyTypes');

export function provideCacheStrategies(strategies: CacheStrategyTypesDeclaration): Provider {
    return {
        provide: CacheStrategyTypesToken,
        useValue: strategies,
        multi: true,
    };
}
