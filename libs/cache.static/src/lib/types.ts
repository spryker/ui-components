import { CacheStrategyConfig } from '@spryker/cache';
import { TimeDurationString } from '@spryker/utils/date';

declare module '@spryker/cache' {
  interface CacheStrategyRegistry {
    static: StaticCacheStrategyConfig;
  }
}

export interface StaticCacheStrategyConfig extends CacheStrategyConfig {
  expiresIn: TimeDurationString;
}
