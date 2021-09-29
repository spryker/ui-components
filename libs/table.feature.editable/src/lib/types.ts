import {
  TableFeatureConfig,
  TableColumn,
  TableDataRow,
  TableColumnTypeOptions,
} from '@spryker/table';
import { DatasourceConfig, Datasource } from '@spryker/datasource';
import { TableDatasourceDependableService } from './table-datasource-dependable.service';
import {
  ButtonShape,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from '@spryker/button';

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
  disableRowKey?: string;
}

export interface TableEditableConfigCreate {
  formInputName: string;
  initialData?: TableEditableConfigCreateData;
  addButton?: TableEditableConfigButton;
  cancelButton?: TableEditableConfigButton;
  disableForCols?: string[];
}

export interface TableEditableConfigUpdate {
  url: TableEditableConfigUrl;
  saveButton?: TableEditableConfigButton;
  cancelButton?: TableEditableConfigButton;
  disableForCols?: string[];
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
  size: ButtonSize;
  shape: ButtonShape;
  variant: ButtonVariant;
  type: ButtonType;
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
declare module '@spryker/datasource' {
  interface DatasourceRegistry {
    'table.editable.dependable': TableDatasourceDependableService;
  }
}

export interface TableDatasourceDependableConfig extends DatasourceConfig {
  dependsOn: string;
  contextKey?: string;
  datasource: DatasourceConfig;
}
