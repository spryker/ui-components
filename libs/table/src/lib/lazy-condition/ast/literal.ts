import {
  LazyConditionAstDef,
  LazyConditionNode,
  LazyConditionNodeEvaluator,
} from '../lazy-condition';

export const LazyConditionNodeKindLiteral = 0;

export interface LazyConditionLiteralNode<T = unknown>
  extends LazyConditionNode {
  kind: typeof LazyConditionNodeKindLiteral;
  literal: T;
}

export function createLazyConditionLiteral<T>(
  literal: T,
): LazyConditionLiteralNode<T> {
  return { kind: LazyConditionNodeKindLiteral, literal };
}

export class LazyConditionLiteralEvaluator
  implements LazyConditionNodeEvaluator<LazyConditionLiteralNode, unknown> {
  evaluate<T>(node: LazyConditionLiteralNode<T>, context: unknown): T {
    return node.literal;
  }
}

export class LazyConditionAstLiteral implements LazyConditionAstDef {
  kind = LazyConditionNodeKindLiteral;
  evaluator = new LazyConditionLiteralEvaluator();
}
