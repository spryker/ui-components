import { InjectionToken, Provider } from '@angular/core';

import { DataTransformerConfiguratorDeclaration } from './types';

export const DataTransformerConfiguratorToken = new InjectionToken<
  DataTransformerConfiguratorDeclaration[]
>('DataTransformerConfiguratorTypes');

export function provideDataTransformerConfiguratorTypes(
  dataConfigurators: DataTransformerConfiguratorDeclaration,
): Provider {
  return {
    provide: DataTransformerConfiguratorToken,
    useValue: dataConfigurators,
    multi: true,
  };
}
