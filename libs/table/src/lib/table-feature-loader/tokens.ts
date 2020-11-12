import { InjectionToken, Provider } from '@angular/core';

import { TableFeaturesRegistry } from './types';

/**
 * Multi-token that contains all registered table features
 */
export const TableFeaturesRegistryToken = new InjectionToken<
  TableFeaturesRegistry[]
>('TableFeaturesRegistry');

export function provideTableFeatures(
  registry: TableFeaturesRegistry,
): Provider {
  return {
    provide: TableFeaturesRegistryToken,
    useValue: registry,
    multi: true,
  };
}
