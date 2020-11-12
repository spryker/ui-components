import { Injectable, Inject, Injector } from '@angular/core';
import { InjectionTokenType } from '../types';
import {
  ContextSerializationStrategyToken,
  ContextSerializationStrategy,
} from './serialization-strategy';
import { getPropByPath } from '../misc';

import { escapeRegex } from '../regex';

export interface AnyContext {
  [key: string]: AnyContext;
}

@Injectable({ providedIn: 'root' })
export class ContextOptions {
  interpolationStart = '${';
  interpolationEnd = '}';
  delimiter = '.';
}

@Injectable({ providedIn: 'root' })
export class ContextService {
  private interpolationStart = escapeRegex(this.options.interpolationStart);
  private interpolationEnd = escapeRegex(this.options.interpolationEnd);
  private expressionRegex = new RegExp(
    `${this.interpolationStart}([^${this.interpolationEnd}]+)${this.interpolationEnd}`,
    'g',
  );
  private serializationStrategies = this.serializationStrategiesArray
    .flat()
    .map((strategyType) => this.injector.get(strategyType));

  constructor(
    private injector: Injector,
    private options: ContextOptions,
    @Inject(ContextSerializationStrategyToken)
    private serializationStrategiesArray: InjectionTokenType<
      typeof ContextSerializationStrategyToken
    >,
  ) {}

  interpolate(value: string, ctx: AnyContext): string {
    this.expressionRegex.lastIndex = 0; // Reset global regex
    return value.replace(this.expressionRegex, (_, expr) =>
      this.postProcess(this.interpolateExpression(expr, ctx)),
    );
  }

  wrap(value: string): string {
    return `${this.options.interpolationStart}${value}${this.options.interpolationEnd}`;
  }

  interpolateExpression(expr: string, ctx: AnyContext): unknown {
    return getPropByPath(ctx, expr, this.options.delimiter);
  }

  private postProcess(value: unknown): string {
    const strategy = this.serializationStrategies.find((s) =>
      s.canSerialize(value),
    );

    if (!strategy) {
      return String(value);
    }

    return strategy.serialize(value);
  }
}
