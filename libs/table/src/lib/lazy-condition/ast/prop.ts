import {
  LazyConditionAstDef,
  LazyConditionNode,
  LazyConditionNodeEvaluator,
  LazyConditionEvaluator,
} from '../lazy-condition';

export const LazyConditionNodeKindProp = 3;

export interface LazyConditionPropNode extends LazyConditionNode {
  kind: typeof LazyConditionNodeKindProp;
  name: string;
  object: LazyConditionNode;
}

export function createLazyConditionProp<T>(
  name: string,
  object: LazyConditionNode,
): LazyConditionPropNode {
  return { kind: LazyConditionNodeKindProp, name, object };
}

export class LazyConditionPropEvaluator
  implements LazyConditionNodeEvaluator<LazyConditionPropNode, unknown> {
  private evaluator?: LazyConditionNodeEvaluator;

  setEvaluator(evaluator: LazyConditionNodeEvaluator) {
    this.evaluator = evaluator;
  }

  evaluate(node: LazyConditionPropNode, context: unknown): unknown {
    return (this.evaluator?.evaluate(node.object, context) as any)?.[node.name];
  }
}

export class LazyConditionAstProp implements LazyConditionAstDef {
  kind = LazyConditionNodeKindProp;
  evaluator = new LazyConditionPropEvaluator();
}
