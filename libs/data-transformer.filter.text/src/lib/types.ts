import { TextDataTransformerFilterService } from './text-data-transformer-filter.service';

declare module '@spryker/data-transformer' {
  interface DataTransformerFilterRegistry {
    text: TextDataTransformerFilterService;
  }
}
