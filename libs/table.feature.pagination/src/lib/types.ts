import { TableFeatureConfig } from '@spryker/table';

declare module '@spryker/table' {
  interface TableConfig {
    pagination?: TablePaginationConfig;
  }
}

export interface TablePaginationConfig extends TableFeatureConfig {
  sizes: number[];
  pageSize: number;
}
