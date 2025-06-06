import { DataTransformerConfig } from '@spryker/data-transformer';

export type LensDataTransformerData = Record<string, unknown>;
export type LensDataTransformerDataT = Record<string, unknown>;

export interface LensDataTransformerConfig extends DataTransformerConfig {
    path: string;
    transformer: DataTransformerConfig;
}
