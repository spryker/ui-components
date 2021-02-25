import { RangeDataTransformerFilterService } from './range-data-transformer-filter.service';

declare module '@spryker/data-transformer' {
  interface DataTransformerFilterRegistry {
    range: RangeDataTransformerFilterService;
  }
}
