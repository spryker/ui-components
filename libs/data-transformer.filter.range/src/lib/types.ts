import { RangeDataTransformerFilterService } from './range-data-transformer-filter.service';

declare module '@spryker/data-transformer.collate' {
  interface DataTransformerFilterRegistry {
    range: RangeDataTransformerFilterService;
  }
}
