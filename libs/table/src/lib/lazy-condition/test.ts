import {
  LazyConditionAstContext,
  createLazyConditionContext,
} from './ast/context';
import {
  createLazyConditionEquals,
  LazyConditionAstEquals,
} from './ast/equals';
import {
  createLazyConditionLiteral,
  LazyConditionAstLiteral,
} from './ast/literal';
import { LazyConditionEvaluator } from './lazy-condition';

const lazyCondition = new LazyConditionEvaluator([
  new LazyConditionAstLiteral(),
  new LazyConditionAstEquals(),
  new LazyConditionAstContext(),
]);

const lazyConditionAst = createLazyConditionEquals([
  createLazyConditionContext('prop1'),
  createLazyConditionLiteral(1),
]);

console.log(lazyCondition.eval(lazyConditionAst, { prop1: 1 }));
console.log(lazyCondition.eval(lazyConditionAst, { prop1: 2 }));
