import { Inject, Injectable, Injector, Optional } from '@angular/core';
import { InjectionTokenType } from '@spryker/utils';

import { PersistenceStrategyTypesToken } from './token';
import {
  PersistenceStrategy,
  PersistenceStrategyRegistry,
  PersistenceStrategyType,
} from './types';

@Injectable({
  providedIn: 'root',
})
export class PersistenceStrategyService {
  strategies = this.strategiesTypes?.reduce(
    (strategies, strategy) => ({ ...strategies, ...strategy }),
    {},
  );

  constructor(
    private injector: Injector,
    @Optional()
    @Inject(PersistenceStrategyTypesToken)
    private strategiesTypes?: InjectionTokenType<
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
    if (!this.strategies) {
      return [];
    }

    const strategies = Object.entries(this.strategies).map((key, strategy) =>
      this.injector.get(strategy),
    );

    return strategies;
  }

  private isPersistenceStrategyRegisteredType(
    type: PersistenceStrategyType,
  ): type is keyof PersistenceStrategyRegistry {
    return Boolean(this.strategies && type in this.strategies);
  }
}
