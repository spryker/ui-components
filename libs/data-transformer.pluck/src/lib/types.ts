import { DataTransformerConfig } from '@spryker/data-transformer';

import { PluckDataTransformerService } from './pluck-data-transformer.service';

declare module '@spryker/data-transformer' {
  interface DataTransformerRegistry {
    pluck: PluckDataTransformerService;
  }
}

export type PluckDataTransformerData = object;
export type PluckDataTransformerDataT = unknown;

export interface PluckDataTransformerConfig extends DataTransformerConfig {
  path: string;
}
