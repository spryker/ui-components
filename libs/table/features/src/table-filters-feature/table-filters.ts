import {
  EventEmitter,
  InjectionToken,
  ModuleWithProviders,
} from '@angular/core';
import { TableFeatureComponent } from '@spryker/table';
import { Distribute } from '@spryker/utils';
import { Observable } from 'rxjs';

declare module '@spryker/table' {
  interface TableConfig {
    filters?: TableFilterBase[];
  }
}

// @Component() class
export interface TableFiltersFeatureComponent extends TableFeatureComponent {
  filterComponentMap: Record<string, TableFilterComponent<TableFilterBase>>;
  filters$: Observable<TableFilterBase[]>;
  filterValues$: Observable<Record<string, unknown>>;
  updateFilterValue(type: string, value: unknown): void;
}

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
  valueChange: EventEmitter<C['__capturedValue']>;
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

// Multi DI token
export type TableFiltersToken = InjectionToken<TableFiltersDeclaration[]>;

// Static @NgModule() class
export interface TableFiltersFeatureModuleType {
  withFilterComponents(
    filters: TableFiltersDeclaration,
  ): ModuleWithProviders<TableFiltersFeatureModuleType>;
}
