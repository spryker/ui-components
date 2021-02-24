import { DataTransformerConfig } from '@spryker/data-transformer';
import { DataTransformerConfiguratorConfig } from '@spryker/data-transformer-configurator';
import {
  DataFilterTransformerByPropName,
  DataTransformerFilterConfig,
} from '@spryker/data-transformer-filter';

declare module '@spryker/data-transformer' {
  interface DataTransformerRegistry {
    collate: CollateDataTransformerConfig;
  }
}

export interface CollateDataTransformerConfig extends DataTransformerConfig {
  configurator: DataTransformerConfiguratorConfig;
  filter?: {
    [filterId: string]: DataTransformerFilterConfig;
  };
  search?: DataTransformerFilterConfig;
  transformerByPropName?: DataFilterTransformerByPropName;
}

export type CollateDataTransformerData = Record<string, unknown>[];

export interface CollateDataTransformerDataT {
  data: Record<string, unknown>[];
  total: number;
  page: number;
  pageSize: number;
}
