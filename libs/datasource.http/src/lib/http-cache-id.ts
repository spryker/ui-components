import { CacheId } from '@spryker/cache';

import { DatasourceHttpConfig } from './types';

export class HttpCacheId implements CacheId {
  constructor(private config: DatasourceHttpConfig) {}

  serialize() {
    return `${this.config.url}${this.config.method ?? 'GET'}`;
  }
}
