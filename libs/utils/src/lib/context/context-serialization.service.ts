import { Inject, Injectable, Injector, Optional } from '@angular/core';

import { InjectionTokenType } from '../types';
import { ContextSerializationStrategyToken } from './serialization-strategy';

@Injectable({
  providedIn: 'root',
})
export class ContextSerializationService {
  private serializationStrategies =
    this.serializationStrategiesArray?.flat() ?? [];

  constructor(
    private injector: Injector,
    @Inject(ContextSerializationStrategyToken)
    @Optional()
    private serializationStrategiesArray: InjectionTokenType<
      typeof ContextSerializationStrategyToken
    > | null,
  ) {}

  serialize(value: unknown): string {
    const strategy = this.serializationStrategies
      .map((strategyType) => this.injector.get(strategyType))
      .find((s) => s.canSerialize(value));

    if (!strategy) {
      return String(value);
    }

    return strategy.serialize(value);
  }
}
