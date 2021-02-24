import { TextDataTransformerFilter } from './text-data-transformer-filter.service';

declare module '@spryker/data-transformer-filter' {
  interface DataTransformerRegistry {
    text: TextDataTransformerFilter;
  }
}
