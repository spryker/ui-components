import { TableFeatureConfig } from '@spryker/table';

declare module '@spryker/table' {
  interface TableColumn {
    id: string;
    hideable?: boolean;
  }

  interface TableConfig {
    columnConfigurator?: TableSettingsConfig;
  }
}

export interface TableSettingsConfig extends TableFeatureConfig {
  tableId?: string;
}
