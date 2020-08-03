import { TableFeatureConfig } from '@spryker/table';

declare module '@spryker/table' {
  interface TableConfig {
    columnConfigurator?: TableSettingsConfig;
  }
}

export interface TableSettingsConfig extends TableFeatureConfig {
  tableId?: string;
}
