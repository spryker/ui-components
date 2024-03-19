import { DataTransformerConfig } from '@spryker/data-transformer';

export interface ArrayMapDataTransformerConfig extends DataTransformerConfig {
    mapItems: DataTransformerConfig;
}

export type ArrayMapDataTransformerData = unknown[];
export type ArrayMapDataTransformerDataT = unknown[];
