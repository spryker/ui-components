import { DataTransformerConfig } from '@spryker/data-transformer';

declare module '@spryker/data-transformer' {
  interface DataTransformerRegistry {
    chain: ChainDataTransformerConfig;
  }
}

export interface ChainDataTransformerConfig extends DataTransformerConfig {
  transformers: DataTransformerConfig[];
}

export type ChainDataTransformerData = unknown;
export type ChainDataTransformerDataT = unknown;
