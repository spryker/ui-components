export enum LazyConditionNodeKind {}

export interface LazyConditionNode {
  kind: unknown;
}

export interface LazyConditionNodeEvaluator<
  N = LazyConditionNode,
  R = unknown
> {
  setEvaluator?(evaluator: LazyConditionNodeEvaluator): void;
  evaluate(node: N, context: unknown): R;
}

export interface LazyConditionAstDef {
  kind: LazyConditionNodeKind;
  evaluator: LazyConditionNodeEvaluator;
}

export class LazyConditionEvaluator implements LazyConditionNodeEvaluator {
  private nodeEvaluators: Record<
    string,
    LazyConditionNodeEvaluator | undefined
  > = this.nodeDefs.reduce(
    (acc, def) => ({ ...acc, [def.kind]: def.evaluator }),
    Object.create(null),
  );

  constructor(private nodeDefs: LazyConditionAstDef[]) {}

  eval(node: LazyConditionNode, context: unknown) {
    // tslint:disable-next-line: no-non-null-assertion
    Object.values(this.nodeEvaluators).forEach(ev => ev!.setEvaluator?.(this));
    return this.evaluate(node, context);
  }

  evaluate(node: LazyConditionNode, context: unknown): unknown {
    const ev = this.nodeEvaluators[node.kind as string];

    if (!ev) {
      throw new Error(
        `LazyConditionEvaluator: Unknown node kind ${node.kind}!`,
      );
    }

    return ev.evaluate(node, context);
  }
}
