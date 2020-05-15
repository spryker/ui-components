import { Injectable } from '@angular/core';

import { LazyConditionAstContext } from './ast/context';
import { LazyConditionAstEquals } from './ast/equals';
import {
  createLazyConditionLiteral,
  LazyConditionAstLiteral,
} from './ast/literal';
import { LazyConditionAstProp } from './ast/prop';
import { LazyConditionEvaluator, LazyConditionNode } from './lazy-condition';

@Injectable({ providedIn: 'root' })
export class LazyConditionService {
  private lazyCondition = new LazyConditionEvaluator([
    new LazyConditionAstLiteral(),
    new LazyConditionAstEquals(),
    new LazyConditionAstContext(),
    new LazyConditionAstProp(),
  ]);

  evaluate(node: LazyConditionNode, context: unknown): unknown {
    return this.lazyCondition.eval(node, context);
  }

  valueToNode(value: unknown): LazyConditionNode {
    if (value && (value as LazyConditionNode).kind) {
      return value as LazyConditionNode;
    }

    return createLazyConditionLiteral(value);
  }
}
