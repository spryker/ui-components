import { Pipe, PipeTransform } from '@angular/core';

import {
  createLazyConditionEquals,
  LazyConditionEqualsNode,
} from './ast/equals';
import { LazyConditionService } from './lazy-condition.service';

@Pipe({ name: 'lcEq' })
export class EqualsPipe implements PipeTransform {
  constructor(private lazyConditionService: LazyConditionService) {}

  transform(value: unknown, ...values: unknown[]): LazyConditionEqualsNode {
    return createLazyConditionEquals([
      this.lazyConditionService.valueToNode(value),
      ...values.map(v => this.lazyConditionService.valueToNode(v)),
    ]);
  }
}
