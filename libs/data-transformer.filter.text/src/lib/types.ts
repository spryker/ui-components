import { TextDataTransformerFilterService } from './text-data-transformer-filter.service';

declare module '@spryker/data-transformer.collate' {
  interface DataTransformerFilterRegistry {
    text: TextDataTransformerFilterService;
  }
}
