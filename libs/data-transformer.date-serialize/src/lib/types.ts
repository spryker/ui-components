import { DataTransformerConfig } from '@spryker/data-transformer';

declare module '@spryker/data-transformer' {
  interface DataTransformerRegistry {
    'date-serialize': DateSerializeDataTransformerConfig;
  }
}

// tslint:disable-next-line: no-empty-interface
export interface DateSerializeDataTransformerConfig
  extends DataTransformerConfig {}

export type DateSerializeDataTransformerData = number;
export type DateSerializeDataTransformerDataT = string;
