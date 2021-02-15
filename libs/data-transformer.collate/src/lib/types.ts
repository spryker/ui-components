import { Injector, Type } from '@angular/core';
import { DataTransformerConfig } from '@spryker/data-transformer';
import { Observable } from 'rxjs';

declare module '@spryker/data-transformer' {
  interface DataTransformerRegistry {
    collate: CollateDataTransformerConfig;
  }
}

export interface CollateDataConfiguratorRegistry {
  // type: CollateDataConfigurator;
}

export type CollateDataConfiguratorType = keyof CollateDataConfiguratorRegistry extends never
  ? string
  : keyof CollateDataConfiguratorRegistry;

export interface CollateDataConfiguratorConfig {
  type: CollateDataConfiguratorType;
  [prop: string]: unknown; // Extra configuration for specific types
}

export interface CollateDataConfig {
  // sorting?: ...;
  // filtering?: ...;
  // page?: number;
  // pageNumber?: number;
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
}

export interface CollateFilterConfig {
  type: string;
  propNames: string;
}

export type CollateDataTransformerData = Record<string, unknown>[];
export type CollateDataTransformerDataT = Record<string, unknown>[];

export interface CollateFilter {
  filter(
    data: Record<string, unknown>[],
    options: CollateFilterConfig,
    byValue: unknown[],
    byValueTransformer: Record<string, string>,
  ): Record<string, unknown>[];
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
