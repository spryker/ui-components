import { Injectable } from '@angular/core';

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

  constructor(private options: ContextOptions) {}

  interpolate(value: string, ctx: AnyContext): string {
    this.expressionRegex.lastIndex = 0; // Reset global regex
    return value.replace(this.expressionRegex, (_, expr) =>
      this.interpolateExpression(expr, ctx),
    );
  }

  wrap(value: string): string {
    return `${this.options.interpolationStart}${value}${this.options.interpolationEnd}`;
  }

  private interpolateExpression(expr: string, ctx: AnyContext): any {
    const paths = expr.split(this.options.delimiter);
    let value = ctx;
    while (value && paths.length) {
      // tslint:disable-next-line: no-non-null-assertion
      value = value[paths.shift()!];
    }
    return value;
  }
}
