import {
  LazyConditionAstDef,
  LazyConditionNode,
  LazyConditionNodeEvaluator,
} from '../lazy-condition';

export const LazyConditionNodeKindEquals = 1;

export interface LazyConditionEqualsNode extends LazyConditionNode {
  kind: typeof LazyConditionNodeKindEquals;
  operands: LazyConditionNode[];
}

export function createLazyConditionEquals(
  operands: LazyConditionNode[],
): LazyConditionEqualsNode {
  return { kind: LazyConditionNodeKindEquals, operands };
}

export class LazyConditionEqualsEvaluator
  implements LazyConditionNodeEvaluator<LazyConditionEqualsNode, boolean> {
  private evaluator?: LazyConditionNodeEvaluator;

  setEvaluator(evaluator: LazyConditionNodeEvaluator): void {
    this.evaluator = evaluator;
  }

  evaluate(node: LazyConditionEqualsNode, context: unknown): boolean {
    const operands = node.operands.map(op =>
      this.evaluator?.evaluate(op, context),
    );

    return operands.every(op => op === operands[0]);
  }
}

export class LazyConditionAstEquals implements LazyConditionAstDef {
  kind = LazyConditionNodeKindEquals;
  evaluator = new LazyConditionEqualsEvaluator();
}
