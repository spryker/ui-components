import { DataTransformerConfig } from '@spryker/data-transformer';

export type PluckDataTransformerData = object;
export type PluckDataTransformerDataT = unknown;

export interface PluckDataTransformerConfig extends DataTransformerConfig {
    path: string;
}
