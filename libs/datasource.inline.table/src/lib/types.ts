import { DataTransformerFilterConfig } from '@spryker/data-transformer.collate';
import { DatasourceConfig } from '@spryker/datasource';

export interface TableDatasourceInlineConfig extends DatasourceConfig {
  data: unknown;
  filter?: {
    [filterId: string]: DataTransformerFilterConfig;
  };
  search?: DataTransformerFilterConfig;
  transformerByPropName?: Record<string, string>;
}
