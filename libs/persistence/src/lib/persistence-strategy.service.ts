import { Inject, Injectable, Injector, Optional, Type } from '@angular/core';
import { InjectionTokenType } from '@spryker/utils';

import { PersistenceStrategyTypesToken } from './token';
import {
  PersistenceStrategy,
  PersistenceStrategyRegistry,
  PersistenceStrategyType,
  PersistenceStrategyTypesDeclaration,
} from './types';

@Injectable({
  providedIn: 'root',
})
export class PersistenceStrategyService {
  private strategies: PersistenceStrategyTypesDeclaration = this.strategiesTypes?.reduce(
    (strategies, strategy) => ({ ...strategies, ...strategy }),
    {},
  );

  constructor(
    private injector: Injector,
    @Inject(PersistenceStrategyTypesToken)
    private strategiesTypes: InjectionTokenType<
      typeof PersistenceStrategyTypesToken
    >,
  ) {}

  select(type: PersistenceStrategyType): PersistenceStrategy {
    if (!this.isPersistenceStrategyRegisteredType(type)) {
      throw Error(`PersistenceStrategyService: Unknown strategy type ${type}`);
    }

    return this.injector.get(this.strategies?.[type]);
  }

  getAll(): PersistenceStrategy[] {
    const strategies = Object.values(this.strategies).map((strategy) =>
      this.injector.get(strategy as Type<PersistenceStrategy>),
    );

    return strategies;
  }

  private isPersistenceStrategyRegisteredType(
    type: PersistenceStrategyType,
  ): type is keyof PersistenceStrategyRegistry {
    return type in this.strategies;
  }
}
