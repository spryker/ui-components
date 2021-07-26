import { TableDataTransformerConfiguratorService } from './table-data-transformer-configurator.service';

declare module '@spryker/data-transformer.collate' {
  interface DataTransformerConfiguratorRegistry {
    table: TableDataTransformerConfiguratorService;
  }
}
