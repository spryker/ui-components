import { Injector } from '@angular/core';
import { DataTransformerConfig } from '@spryker/data-transformer';
import { RegistryDeclaration, RegistryType } from '@spryker/utils';
import { Observable } from 'rxjs';

declare module '@spryker/data-transformer' {
  interface DataTransformerRegistry {
    collate: CollateDataTransformerConfig;
  }
}

export interface CollateDataTransformerConfig extends DataTransformerConfig {
  configurator: DataTransformerConfiguratorConfig;
  filter?: {
    [filterId: string]: DataTransformerFilterConfig;
  };
  search?: DataTransformerFilterConfig;
  transformerByPropName?: DataFilterTransformerByPropName;
}

export type CollateDataTransformerData = Record<string, unknown>[];

export interface CollateDataTransformerDataT {
  data: Record<string, unknown>[];
  total: number;
  page: number;
  pageSize: number;
}

// tslint:disable-next-line: no-empty-interface
export interface DataTransformerConfiguratorRegistry {}

export type DataTransformerConfiguratorType = RegistryType<
  DataTransformerConfiguratorRegistry
>;

export type DataTransformerConfiguratorDeclaration = RegistryDeclaration<
  DataTransformerConfiguratorRegistry
>;

export interface DataTransformerConfiguratorConfig {
  type: DataTransformerConfiguratorType;
  [prop: string]: unknown; // Extra configuration for specific types
}

export interface DataTransformerConfiguratorConfigT {
  filter?: unknown;
  search?: unknown;
  sorting?: {
    sortBy?: string;
    sortDirection?: string;
  };
  page?: number;
  pageSize?: number;
}

export interface DataTransformerConfigurator {
  resolve(injector: Injector): Observable<DataTransformerConfiguratorConfigT>;
}

export interface DataTransformerFilter {
  filter(
    data: DataTransformerFilterData,
    options: DataTransformerFilterConfig,
    byValue: DataTransformerFilterByValue,
    transformerByPropName?: DataFilterTransformerByPropName,
  ): Observable<DataTransformerFilterData>;
}

export type DataTransformerFilterDeclaration = RegistryDeclaration<
  DataTransformerFilterRegistry
>;

// tslint:disable-next-line: no-empty-interface
export interface DataTransformerFilterRegistry {}

export type DataTransformerFilterRegistryType = RegistryType<
  DataTransformerFilterRegistry
>;

export type DataTransformerFilterData = Record<string, unknown>[];

export type DataTransformerFilterByValue = unknown[];

export interface DataTransformerFilterConfig {
  type: string;
  propNames: string[];
}

export type DataFilterTransformerByPropName = Record<string, string>;
