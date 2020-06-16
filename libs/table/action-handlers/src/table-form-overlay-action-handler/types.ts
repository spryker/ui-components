import { TableActionBase } from '@spryker/table';

declare module '@spryker/table' {
  interface TableActionRegistry {
    'form-overlay': TableFormOverlayAction;
  }
}

export interface TableFormOverlayOptions {
  url: string;
  method?: string;
}

export interface TableFormOverlayAction extends TableActionBase {
  typeOptions: TableFormOverlayOptions;
}
