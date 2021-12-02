import { DataTransformerConfig } from '@spryker/data-transformer';

export interface ChainDataTransformerConfig extends DataTransformerConfig {
  transformers: DataTransformerConfig[];
}

export type ChainDataTransformerData = unknown;
export type ChainDataTransformerDataT = unknown;
