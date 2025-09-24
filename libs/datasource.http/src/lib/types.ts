import { CacheStrategyConfig } from '@spryker/cache';
import { DatasourceConfig } from '@spryker/datasource';

export interface DatasourceHttpConfig extends DatasourceConfig {
    url: string;
    method?: string;
    dataIn?: DatasourceHttpConfigDataIn;
    cache?: CacheStrategyConfig;
}

export enum DatasourceHttpConfigDataIn {
    Params = 'params',
    Body = 'body',
}
