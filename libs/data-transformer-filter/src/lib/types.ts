import { RegistryDeclaration, RegistryType } from '@spryker/utils';
import { Observable } from 'rxjs';

export interface DataTransformerFilter {
  filter(
    data: DataTransformerFilterData,
    options: DataTransformerFilterConfig,
    byValue: DataTransformerFilterByValue,
    transformerByPropName?: DataFilterTransformerByPropName,
  ): Observable<DataTransformerFilterData>;
}

export type DataTransformerFiltersDeclaration = RegistryDeclaration<
  DataTransformerFiltersRegistry
>;

// tslint:disable-next-line: no-empty-interface
export interface DataTransformerFiltersRegistry {}

export type DataTransformerFiltersRegistryType = RegistryType<
  DataTransformerFiltersRegistry
>;

export type DataTransformerFilterData = Record<string, unknown>[];

export type DataTransformerFilterByValue = unknown[];

export interface DataTransformerFilterConfig {
  type: string;
  propNames: string[];
}

export type DataFilterTransformerByPropName = Record<string, string>;
