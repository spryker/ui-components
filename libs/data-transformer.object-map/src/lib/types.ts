import { DataTransformerConfig } from '@spryker/data-transformer';

export interface ObjectMapDataTransformerConfig extends DataTransformerConfig {
  mapProps: { [propName: string]: DataTransformerConfig };
}

export type ObjectMapDataTransformerData = Record<string, unknown>;
export type ObjectMapDataTransformerDataT = Record<string, unknown>;
