import { EqualsDataTransformerFilterService } from './equals-data-transformer-filter.service';

declare module '@spryker/data-transformer.collate' {
  interface DataTransformerFilterRegistry {
    equals: EqualsDataTransformerFilterService;
  }
}
