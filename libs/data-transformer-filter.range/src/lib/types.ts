import { RangeDataTransformerFilter } from './range-data-transformer-filter.service';

declare module '@spryker/data-transformer-filter' {
  interface DataTransformerRegistry {
    range: RangeDataTransformerFilter;
  }
}
