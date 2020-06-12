import { TableActionBase } from '@spryker/table';

export interface TableFormOverlayOptions {
  url: string;
  method?: string;
}

export interface TableFormOverlayAction extends TableActionBase {
  typeOptions: TableFormOverlayOptions;
}
