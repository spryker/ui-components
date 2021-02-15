import { DataTransformerConfig } from '@spryker/data-transformer';

declare module '@spryker/data-transformer' {
  interface DataTransformerRegistry {
    'object-map': ObjectMapDataTransformerConfig;
  }
}

export interface ObjectMapDataTransformerConfig extends DataTransformerConfig {
  mapProps: { [propName: string]: DataTransformerConfig };
}

export type ObjectMapDataTransformerData = Record<string, unknown>;
export type ObjectMapDataTransformerDataT = object;
