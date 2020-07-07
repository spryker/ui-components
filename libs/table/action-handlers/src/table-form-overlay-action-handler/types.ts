import { TableActionBase } from '@spryker/table';

declare module '@spryker/table' {
  interface TableActionRegistry {
    'form-overlay': TableFormOverlayAction;
  }
}

export interface Api {
  [key: string]: string;
}

export interface TableFormOverlayOptions {
  url: string;
  method?: string;
}

export type TableFormOverlayOptionsWithIndex = {
  [key: string]: string;
} & TableFormOverlayOptions;

export interface TableFormOverlayAction extends TableActionBase {
  typeOptions: TableFormOverlayOptionsWithIndex;
}
