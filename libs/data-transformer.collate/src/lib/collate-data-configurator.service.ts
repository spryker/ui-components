import { Inject, Injectable, Injector } from '@angular/core';
import { InjectionTokenType } from '@spryker/utils';
import { Observable } from 'rxjs';

import { CollateDataConfiguratorTypesToken } from './tokens';
import {
  CollateDataConfig,
  CollateDataConfiguratorConfig,
  CollateDataConfiguratorRegistry,
  CollateDataConfiguratorsDeclaration,
  CollateDataConfiguratorType,
} from './types';

@Injectable({ providedIn: 'root' })
export class CollateDataConfiguratorService {
  private dataConfigurators: CollateDataConfiguratorsDeclaration = this.dataConfiguratorsTypes.reduce(
    (dataConfigurator, dataConfigurators) => ({
      ...dataConfigurator,
      ...dataConfigurators,
    }),
    {},
  );

  constructor(
    @Inject(CollateDataConfiguratorTypesToken)
    private dataConfiguratorsTypes: InjectionTokenType<
      typeof CollateDataConfiguratorTypesToken
    >,
  ) {}

  resolve(
    config: CollateDataConfiguratorConfig,
    injector: Injector,
  ): Observable<CollateDataConfig> {
    if (!this.isDataConfiguratorRegisteredType(config.type)) {
      throw Error(
        `CollateDataConfiguratorService: Unknown data configurator type ${config.type}`,
      );
    }

    const dataConfigurator = injector.get(this.dataConfigurators[config.type]);

    return dataConfigurator.resolve(injector);
  }

  private isDataConfiguratorRegisteredType(
    type: CollateDataConfiguratorType,
  ): type is keyof CollateDataConfiguratorRegistry {
    return type in this.dataConfigurators;
  }
}
