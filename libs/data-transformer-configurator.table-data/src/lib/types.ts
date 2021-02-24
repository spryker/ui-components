import { TableDataDataConfiguratorTransformer } from './table-data-data-transformer-configurator.service';

declare module '@spryker/data-transformer-configurator' {
  interface DataTransformerConfiguratorRegistry {
    'table-data': TableDataDataConfiguratorTransformer;
  }
}
