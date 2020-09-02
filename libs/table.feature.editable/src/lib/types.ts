import { TableColumn, TableFeatureConfig } from '@spryker/table';

declare module '@spryker/table' {
  interface TableConfig {
    editable?: TableEditableConfig;
  }
}

export interface TableEditableConfig extends TableFeatureConfig {
  urls: TableEditableUrls;
  columns: Partial<TableColumn>[];
  addRowButton?: TableEditableButton;
  submitRowButton?: TableEditableButton;
  cancelRowButton?: TableEditableButton;
}

export interface TableEditableUrls {
  create: TableEditableUrl;
  update: TableEditableUrl;
}

export interface TableEditableUrlConfig {
  url: string;
  method?: string;
}

type TableEditableUrl = string | TableEditableUrlConfig;

export interface TableEditableButtonText
  extends Partial<TableEditableButtonIcon> {
  title: string;
}

export interface TableEditableButtonIcon {
  icon: string;
}

export type TableEditableButton =
  | TableEditableButtonText
  | TableEditableButtonIcon;

export interface TableEditableEventData<T = unknown> {
  colId: string;
  value?: T;
}

export class TableEditableEvent<T = unknown> extends CustomEvent<
  TableEditableEventData<T>
> {
  static readonly eventName = 'spy-table-editable';

  constructor(detail: TableEditableEventData<T>) {
    super(TableEditableEvent.eventName, {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail,
    });
  }
}
