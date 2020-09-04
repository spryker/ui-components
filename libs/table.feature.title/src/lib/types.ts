import { TableFeatureConfig } from '@spryker/table';

declare module '@spryker/table' {
  interface TableConfig {
    title?: TableTitleConfig;
  }
}

export interface TableTitleConfig extends TableFeatureConfig {
  title?: string;
}
