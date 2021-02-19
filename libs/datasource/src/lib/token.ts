import { InjectionToken, Provider } from '@angular/core';

import { DatasourceTypesDeclaration } from './types';

export const DatasourceTypesToken = new InjectionToken<
  DatasourceTypesDeclaration[]
>('DatasourceTypes');

export function provideDatasources(
  datasources: DatasourceTypesDeclaration,
): Provider {
  return {
    provide: DatasourceTypesToken,
    useValue: datasources,
    multi: true,
  };
}
