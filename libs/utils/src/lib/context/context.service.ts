import { Injectable } from '@angular/core';

import { getPropByPath } from '../misc';
import { escapeRegex } from '../regex';
import { ContextSerializationService } from './context-serialization.service';

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

  constructor(
    private options: ContextOptions,
    private contextSerializationService: ContextSerializationService,
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

  interpolateExpression(expr: string, ctx?: AnyContext): unknown {
    return getPropByPath(ctx, expr, this.options.delimiter);
  }

  private postProcess(value: unknown): string {
    return this.contextSerializationService.serialize(value);
  }
}
