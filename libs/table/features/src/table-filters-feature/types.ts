/* tslint:disable:no-empty-interface */
import { EventEmitter } from '@angular/core';
import { Distribute } from '@spryker/utils';

export interface TableFilterBase<V = unknown> {
  __capturedValue: V;
  id: string;
  title: string;
  type: string;
  typeOptions?: unknown;
}

export interface TableFiltersRegistry {
  // Key is string - value is type TableFilterBase
}

export type TableFilterMap = TableFiltersRegistry[keyof TableFiltersRegistry] extends never
  ? { [type: string]: TableFilterBase }
  : TableFiltersRegistry;

export type TableFilter = TableFilterMap[keyof TableFiltersRegistry];

export type TableFilterType = TableFilter['type'];

export interface TableFilterComponent<C extends TableFilterBase> {
  config?: C; // @Input
  value?: C['__capturedValue']; // @Input
  valueChange: EventEmitter<C['__capturedValue']>; // @Output
}

export type FindTableFilter<
  T extends TableFilter['type'],
  F = Distribute<TableFilter>
> = F extends { type: T } ? F : never;

export type TableFiltersDeclaration = Partial<
  {
    [P in TableFilterType]: TableFilterComponent<FindTableFilter<P>>;
  }
>;
