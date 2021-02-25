import { DataTransformerConfig } from '@spryker/data-transformer';

declare module '@spryker/data-transformer' {
  interface DataTransformerRegistry {
    'date-parse': DateParseDataTransformerConfig;
  }
}

// tslint:disable-next-line: no-empty-interface
export interface DateParseDataTransformerConfig extends DataTransformerConfig {}

export type DateParseDataTransformerData = string;
export type DateParseDataTransformerDataT = number;
