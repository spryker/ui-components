import { TableDatasourceConfig } from '@spryker/table';

declare module '@spryker/table' {
  interface TableDatasourceTypeRegistry {
    http: TableDatasourceHttpConfig;
  }
}

export interface TableDatasourceHttpConfig extends TableDatasourceConfig {
  url: string;
}
