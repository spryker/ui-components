import { InjectionToken, Provider } from '@angular/core';
import { InjectableType } from '@spryker/utils';

import { DatasourceTypesDeclaration } from './types';

export const DatasourceTypesToken = new InjectionToken<
  DatasourceTypesDeclaration[]
>('DatasourceTypes');

export function provideDatasources(
  datasources: InjectableType<DatasourceTypesDeclaration>,
): Provider {
  return {
    provide: DatasourceTypesToken,
    useValue: datasources,
    multi: true,
  };
}
