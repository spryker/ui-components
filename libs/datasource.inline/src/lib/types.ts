import { DatasourceConfig } from '@spryker/datasource';

import { DatasourceInlineService } from './datasource-inline.service';

declare module '@spryker/datasource' {
  interface DatasourceRegistry {
    inline: DatasourceInlineService;
  }
}

export interface DatasourceInlineConfig extends DatasourceConfig {
  data: unknown;
}
