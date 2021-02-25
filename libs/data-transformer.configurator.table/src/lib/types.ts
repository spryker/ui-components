import { TableDataTransformerConfiguratorService } from './table-data-transformer-configurator.service';

declare module '@spryker/data-transformer' {
  interface DataTransformerConfiguratorRegistry {
    table: TableDataTransformerConfiguratorService;
  }
}
