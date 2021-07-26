import { CacheStrategyConfig } from '@spryker/cache';
import { DatasourceConfig } from '@spryker/datasource';

import { DatasourceHttpService } from './datasource-http.service';

declare module '@spryker/datasource' {
  interface DatasourceRegistry {
    http: DatasourceHttpService;
  }
}

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
