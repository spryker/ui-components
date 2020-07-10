import { TableFeatureConfig } from '@spryker/table';

declare module '@spryker/table' {
  interface TableConfig {
    syncStateUrl?: TableSyncStateConfig;
  }
}

export interface TableSyncStateConfig extends TableFeatureConfig {
  tableId?: string;
}
