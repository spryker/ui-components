import { Pipe, PipeTransform } from '@angular/core';

import {
  createLazyConditionContext,
  LazyConditionContextNode,
} from './ast/context';

@Pipe({ name: 'lcCtx' })
export class ContextPipe implements PipeTransform {
  transform(property: string): LazyConditionContextNode {
    return createLazyConditionContext(property);
  }
}
