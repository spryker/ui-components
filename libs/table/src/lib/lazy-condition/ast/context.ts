import {
  LazyConditionAstDef,
  LazyConditionNode,
  LazyConditionNodeEvaluator,
} from '../lazy-condition';

export const LazyConditionNodeKindContext = 2;

export interface LazyConditionContextNode extends LazyConditionNode {
  kind: typeof LazyConditionNodeKindContext;
  property: string;
}

export function createLazyConditionContext(
  property: string,
): LazyConditionContextNode {
  return { kind: LazyConditionNodeKindContext, property };
}

export class LazyConditionContextEvaluator
  implements LazyConditionNodeEvaluator<LazyConditionContextNode, boolean> {
  evaluate(node: LazyConditionContextNode, context: unknown): boolean {
    return (context as any)?.[node.property];
  }
}

export class LazyConditionAstContext implements LazyConditionAstDef {
  kind = LazyConditionNodeKindContext;
  evaluator = new LazyConditionContextEvaluator();
}
