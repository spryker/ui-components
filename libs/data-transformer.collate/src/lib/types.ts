import { Injector, Type } from '@angular/core';
import { DataTransformerConfig } from '@spryker/data-transformer';
import { Observable } from 'rxjs';

declare module '@spryker/data-transformer' {
  interface DataTransformerRegistry {
    collate: CollateDataTransformerConfig;
  }
}

// tslint:disable-next-line: no-empty-interface
export interface CollateDataConfiguratorRegistry {}

export type CollateDataConfiguratorType = keyof CollateDataConfiguratorRegistry extends never
  ? string
  : keyof CollateDataConfiguratorRegistry;

export interface CollateDataConfiguratorConfig {
  type: CollateDataConfiguratorType;
  [prop: string]: unknown; // Extra configuration for specific types
}

export interface CollateDataConfig {
  filter?: unknown;
  search?: unknown;
  sorting?: {
    sortBy?: string;
    sortDirection?: string;
  };
  page?: number;
  pageSize?: number;
}

export interface CollateDataConfigurator {
  resolve(injector: Injector): Observable<CollateDataConfig>;
}

export interface CollateDataTransformerConfig extends DataTransformerConfig {
  configurator: CollateDataConfiguratorConfig;
  filter?: {
    [filterId: string]: CollateFilterConfig;
  };
  search?: CollateFilterConfig;
  transformerByPropName?: CollateTransformerByPropName;
}

export interface CollateFilterConfig {
  type: string;
  propNames: string[];
}

export type CollateDataTransformerData = Record<string, unknown>[];

export interface CollateDataTransformerDataT {
  data: Record<string, unknown>[];
  total: number;
  page: number;
  pageSize: number;
}

export interface CollateFilter {
  filter(
    data: CollateFilterData,
    options: CollateFilterConfig,
    byValue: CollateFilterByValue,
    transformerByPropName?: CollateTransformerByPropName,
  ): Observable<CollateFilterData>;
}

export interface CollateFiltersDeclaration {
  [type: string]: Type<CollateFilter>;
}

export interface CollateDataConfiguratorsDeclaration {
  [type: string]: Type<CollateDataConfigurator>;
}

// tslint:disable-next-line: no-empty-interface
export interface CollateFiltersRegistry {}

export type CollateFiltersRegistryType = keyof CollateFiltersRegistry extends never
  ? string
  : keyof CollateFiltersRegistry;

export type CollateFilterData = Record<string, unknown>[];

export type CollateFilterByValue = unknown[];

export type CollateTransformerByPropName = Record<string, string>;
