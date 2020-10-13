import {
  TableFeatureConfig,
  TableColumn,
  TableDataRow,
  TableColumnTypeOptions,
} from '@spryker/table';

declare module '@spryker/table' {
  interface TableConfig {
    editable?: TableEditableConfig;
  }
}

export interface TableEditableColumn extends TableColumn {
  typeOptions?: TableEditableColumnTypeOptions;
}

export interface TableEditableColumnTypeOptions extends TableColumnTypeOptions {
  editableError?: string;
}

export interface TableEditableConfig extends TableFeatureConfig {
  columns: TableEditableColumn[];
  create?: TableEditableConfigCreate;
  update?: TableEditableConfigUpdate;
}

export interface TableEditableConfigCreate {
  formInputName: string;
  initialData?: TableEditableConfigCreateData;
  addButton?: TableEditableConfigButton;
  cancelButton?: TableEditableConfigButton;
}

export interface TableEditableConfigUpdate {
  url: TableEditableConfigUrl;
  saveButton?: TableEditableConfigButton;
  cancelButton?: TableEditableConfigButton;
}

export interface TableEditableConfigCreateData {
  data: TableDataRow[];
  errors?: TableEditableConfigDataErrors;
}

export interface TableEditableConfigDataErrorsFields {
  rowError?: string;
  columnErrors?: { [columnId: string]: string | undefined };
}

export interface TableEditableConfigDataErrors {
  [rowIdx: string]: TableEditableConfigDataErrorsFields;
}

export interface TableEditableConfigUrlObject {
  url: string;
  method?: string;
}

export type TableEditableConfigUrl = string | TableEditableConfigUrlObject;

export interface TableEditableConfigButtonIcon {
  icon: string;
}

export interface TableEditableConfigButtonText
  extends Partial<TableEditableConfigButtonIcon> {
  title: string;
}

export type TableEditableConfigButton =
  | TableEditableConfigButtonText
  | TableEditableConfigButtonIcon;

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
