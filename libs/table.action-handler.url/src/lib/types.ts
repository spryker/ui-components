import { TableActionBase } from '@spryker/table';

declare module '@spryker/table' {
  interface TableActionRegistry {
    url: TableUrlAction;
  }
}

export interface TableUrlOptions {
  url: string;
  method?: string;
}

export interface TableUrlAction extends TableActionBase {
  typeOptions: TableUrlOptions;
}
