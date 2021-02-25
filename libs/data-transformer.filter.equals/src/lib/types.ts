import { EqualsDataTransformerFilterService } from './equals-data-transformer-filter.service';

declare module '@spryker/data-transformer' {
  interface DataTransformerFilterRegistry {
    equals: EqualsDataTransformerFilterService;
  }
}
