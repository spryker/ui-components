import { Pipe, PipeTransform } from '@angular/core';

import { createLazyConditionProp, LazyConditionPropNode } from './ast/prop';
import { LazyConditionService } from './lazy-condition.service';

@Pipe({ name: 'lcProp' })
export class PropPipe implements PipeTransform {
  constructor(private lazyConditionService: LazyConditionService) {}

  transform(obj: unknown, name: string): LazyConditionPropNode {
    return createLazyConditionProp(
      name,
      this.lazyConditionService.valueToNode(obj),
    );
  }
}
