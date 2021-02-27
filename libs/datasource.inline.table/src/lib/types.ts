import { DataTransformerFilterConfig } from '@spryker/data-transformer.collate';
import { DatasourceConfig } from '@spryker/datasource';

import { TableDatasourceInlineService } from './table-datasource-inline.service';

declare module '@spryker/datasource' {
  interface DatasourceRegistry {
    'table.inline': TableDatasourceInlineService;
  }
}

export interface TableDatasourceInlineConfig extends DatasourceConfig {
  data: unknown;
  filter?: {
    [filterId: string]: DataTransformerFilterConfig;
  };
  search?: DataTransformerFilterConfig;
  transformerByPropName?: Record<string, string>;
}
