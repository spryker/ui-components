import { DatasourceConfig } from '@spryker/datasource';

export interface DatasourceInlineConfig extends DatasourceConfig {
    data: unknown;
}
