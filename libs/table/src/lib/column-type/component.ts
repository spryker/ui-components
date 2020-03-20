import { Type } from '@angular/core';
import { DynamicComponent } from '@orchestrator/core';

import { TableColumnComponent } from '../table/table';

export function TableColumnTypeComponent<C>(config: Type<C>) {
  return (target: Type<any>) =>
    DynamicComponent({ config })(target);
}
