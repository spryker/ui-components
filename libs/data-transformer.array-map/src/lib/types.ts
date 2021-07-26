import { DataTransformerConfig } from '@spryker/data-transformer';

declare module '@spryker/data-transformer' {
  interface DataTransformerRegistry {
    'array-map': ArrayMapDataTransformerConfig;
  }
}

export interface ArrayMapDataTransformerConfig extends DataTransformerConfig {
  mapItems: DataTransformerConfig;
}

export type ArrayMapDataTransformerData = unknown[];
export type ArrayMapDataTransformerDataT = unknown[];
