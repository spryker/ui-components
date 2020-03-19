/* tslint:disable:no-empty-interface */
import { EventEmitter } from '@angular/core';

export interface TableFiltersRegistry {
  // Key is string - value is type TableFilterBase
}

export interface TableFilterBase<V = unknown> {
  __capturedValue: V;
  id: string;
  title: string;
  type: string;
  typeOptions?: unknown;
}

export interface TableFilterComponent<C extends TableFilterBase> {
  config?: C;
  value?: C['__capturedValue']; // @Input
  valueChange: EventEmitter<C['__capturedValue']>;
}
