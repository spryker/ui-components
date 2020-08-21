import { TableFeatureConfig } from '@spryker/table';

declare module '@spryker/table' {
  interface TableConfig {
    itemSelection?: TableSelectableConfig;
  }
}

// tslint:disable-next-line: no-empty-interface
export interface TableSelectableConfig extends TableFeatureConfig {}
