import { Inject, Injectable, Injector } from '@angular/core';
import { InjectionTokenType } from '@spryker/utils';
import { Observable } from 'rxjs';

import { DataTransformerConfiguratorToken } from './token';
import {
  DataTransformerConfigurator,
  DataTransformerConfiguratorConfig,
  DataTransformerConfiguratorDeclaration,
  DataTransformerConfiguratorRegistry,
  DataTransformerConfiguratorType,
} from './types';

@Injectable({ providedIn: 'root' })
export class DataTransformerConfiguratorService {
  private dataConfigurators: DataTransformerConfiguratorDeclaration = this.dataConfiguratorsTypes.reduce(
    (dataConfigurators, dataConfigurator) => ({
      ...dataConfigurators,
      ...dataConfigurator,
    }),
    {},
  );

  constructor(
    @Inject(DataTransformerConfiguratorToken)
    private dataConfiguratorsTypes: InjectionTokenType<
      typeof DataTransformerConfiguratorToken
    >,
  ) {}

  resolve(
    config: DataTransformerConfiguratorConfig,
    injector: Injector,
  ): Observable<unknown> {
    if (!this.isDataConfiguratorRegisteredType(config.type)) {
      throw Error(
        `DataTransformerConfiguratorService: Unknown data configurator type ${config.type}`,
      );
    }

    const dataConfigurator: DataTransformerConfigurator<unknown> = injector.get(
      this.dataConfigurators[config.type],
    );

    return dataConfigurator.resolve(injector);
  }

  private isDataConfiguratorRegisteredType(
    type: DataTransformerConfiguratorType,
  ): type is keyof DataTransformerConfiguratorRegistry {
    return type in this.dataConfigurators;
  }
}
