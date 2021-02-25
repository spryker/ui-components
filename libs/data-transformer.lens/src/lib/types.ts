import { DataTransformerConfig } from '@spryker/data-transformer';

import { LensDataTransformerService } from './lens-data-transformer.service';

declare module '@spryker/data-transformer' {
  interface DataTransformerRegistry {
    lens: LensDataTransformerService;
  }
}

export type LensDataTransformerData = Record<string, unknown>;
export type LensDataTransformerDataT = Record<string, unknown>;

export interface LensDataTransformerConfig extends DataTransformerConfig {
  path: string;
  transformer: DataTransformerConfig;
}
