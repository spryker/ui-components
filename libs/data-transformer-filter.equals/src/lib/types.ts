import { EqualsDataTransformerFilter } from './equals-data-transformer-filter.service';

declare module '@spryker/data-transformer-filter' {
  interface DataTransformerRegistry {
    equals: EqualsDataTransformerFilter;
  }
}
