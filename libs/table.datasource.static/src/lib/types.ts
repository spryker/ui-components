import { TableDatasourceConfig, TableData } from '@spryker/table';

declare module '@spryker/table' {
  interface TableDatasourceTypeRegistry {
    static: TableDatasourceStaticConfig;
  }
}

export interface TableDatasourceStaticConfig extends TableDatasourceConfig {
  data: TableData;
}
