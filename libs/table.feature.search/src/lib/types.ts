import { TableFeatureConfig } from '@spryker/table';

declare module '@spryker/table' {
  interface TableConfig {
    search?: TableSearchConfig;
  }
}

export interface TableSearchConfig extends TableFeatureConfig {
  placeholder?: string;
}
