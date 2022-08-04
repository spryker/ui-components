import { CacheStrategyConfig } from '@spryker/cache';
import { TimeDurationString } from '@spryker/utils/date';

export interface StaticCacheStrategyConfig extends CacheStrategyConfig {
  expiresIn: TimeDurationString;
}
