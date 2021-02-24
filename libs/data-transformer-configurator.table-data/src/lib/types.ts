import { TableDataDataConfiguratorTransformer } from './table-data-data-transformer-configurator.service';

declare module '@spryker/data-transformer-configurator' {
  interface DataTransformerConfiguratorRegistry {
    'table-data': TableDataDataConfiguratorTransformer;
  }
}

export interface TableDataDataConfiguratorTransformerConfig {
  filter?: unknown;
  search?: unknown;
  sorting?: {
    sortBy?: string;
    sortDirection?: string;
  };
  page?: number;
  pageSize?: number;
}
