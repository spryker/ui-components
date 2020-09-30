import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ButtonSize, ButtonVariant } from '@spryker/button';
import {
  IconActionModule,
  IconCheckModule,
  IconRemoveModule,
} from '@spryker/icon/icons';
import { PopoverPosition, PopoverTrigger } from '@spryker/popover';
import {
  TableColumn,
  TableColumns,
  TableDataRow,
  TableFeatureComponent,
  TableFeatureLocation,
} from '@spryker/table';
import { map, pluck, switchMap } from 'rxjs/operators';

import {
  TableEditableColumn,
  TableEditableColumnTypeOptions,
  TableEditableConfig,
  TableEditableEvent,
} from './types';

import { provideInvokeContext, ContextService } from '@spryker/utils';
import { AjaxActionService } from '@spryker/ajax-action';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'spy-table-editable-feature',
  templateUrl: './table-editable-feature.component.html',
  styleUrls: ['./table-editable-feature.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: TableFeatureComponent,
      useExisting: TableEditableFeatureComponent,
    },
    provideInvokeContext(TableEditableFeatureComponent),
  ],
})
export class TableEditableFeatureComponent extends TableFeatureComponent<
  TableEditableConfig
> {
  name = 'editable';
  editIcon = IconActionModule.icon;
  checkIcon = IconCheckModule.icon;
  removeIcon = IconRemoveModule.icon;
  tableLocation = TableFeatureLocation;
  buttonSize = ButtonSize;
  buttonVariant = ButtonVariant;
  popoverTrigger = PopoverTrigger;
  popoverPosition = PopoverPosition;

  private cdr = this.injector.get(ChangeDetectorRef);
  private ajaxActionService = this.injector.get(AjaxActionService);
  private contextService = this.injector.get(ContextService);
  private httpClient = this.injector.get(HttpClient);

  isAddingMode = false;
  isAddingInProgress = false;
  addModelValid = false;
  canAddRow = false;
  addModel: any = {};

  editingCell: boolean[][] = [];
  editingModel: { value?: any; colId?: string; i?: number } = {};
  isEditingInProgress = false;
  editingModelValid = false;

  tableColumns$ = this.table$.pipe(switchMap(table => table.columns$));

  mockColumnData$ = this.tableColumns$.pipe(
    map(columns =>
      columns.reduce(
        (acc, column) => ({ ...acc, [column.id]: '' }),
        {} as Record<TableColumn['id'], string>,
      ),
    ),
  );

  urls$ = this.config$.pipe(pluck('urls'));
  editColumns$ = this.config$.pipe(
    pluck('columns'),
    map(columns => columns ?? []),
  );

  createConfig$ = this.config$.pipe(
    pluck('create'),
    map(data => ({
      formInputName: data?.formInputName,
      initialData: data?.initialData,
      addButton: data?.addButton,
      cancelButton: data?.cancelButton,
    })),
  );

  updateConfig$ = this.config$.pipe(
    pluck('update'),
    map(data => ({
      url: data?.url,
      saveButton: data?.saveButton,
      cancelButton: data?.cancelButton,
    })),
  );

  addButton$ = this.createConfig$.pipe(
    pluck('addButton'),
    map((button: any) => ({
      icon: button?.icon,
      title: button?.title,
    })),
  );

  cancelButtonCreate$ = this.createConfig$.pipe(
    pluck('cancelButton'),
    map((button: any) => ({
      icon: button?.icon,
      title: button?.title,
    })),
  );

  saveButtonUpdate$ = this.updateConfig$.pipe(
    pluck('saveButton'),
    map((button: any) => ({
      icon: button?.icon,
      title: button?.title,
    })),
  );

  cancelButtonUpdate$ = this.updateConfig$.pipe(
    pluck('cancelButton'),
    map((button: any) => ({
      icon: button?.icon,
      title: button?.title,
    })),
  );

  toggleAddMode(isAdding: boolean) {
    this.isAddingMode = isAdding;
    this.isAddingInProgress = false;
    this.addModelValid = false;
    this.canAddRow = false;
    this.addModel = {};
    this.cdr.markForCheck();
  }

  getEditColumn(
    column: TableColumn,
    editColumns: TableColumns,
    errors?: Record<string, string>,
  ): TableColumn {
    const editColumn = editColumns.find(c => c.id === column.id) ?? column;

    if (errors && errors[column.id]) {
      const cloneEditColumn = { ...editColumn };
      const cloneTypeOptions: TableEditableColumnTypeOptions = {
        ...cloneEditColumn.typeOptions,
      };

      cloneTypeOptions.editableError = errors[column.id];
      cloneEditColumn.typeOptions = cloneTypeOptions;

      return cloneEditColumn;
    }

    return editColumn;
  }

  // onAddUpdated({ detail }: TableEditableEvent) {
  //   if (detail.value) {
  //     this.addModel[detail.colId] = detail.value;
  //   } else {
  //     delete this.addModel[detail.colId];
  //   }

  //   this.addModelValid = Object.keys(this.addModel).length > 0;
  //   console.log('onCellUpdated', this.addModel);
  // }

  onAddUpdated({ detail }: TableEditableEvent) { // MUST update the value of current cell in Sync Input that contains JSON stringified array
    if (detail.value) {
      this.addModel[detail.colId] = detail.value;
    } else {
      delete this.addModel[detail.colId];
    }

    this.addModelValid = Object.keys(this.addModel).length > 0;
    console.log('onCellUpdated', this.addModel);
  }

  submitAdd() {
    if (this.isAddingInProgress || !this.addModelValid) {
      return;
    }

    this.isAddingInProgress = true;
    console.log('Submitting new row', this.addModel);

    setTimeout(() => {
      this.isAddingInProgress = false;
      this.toggleAddMode(false);
      this.dataConfiguratorService?.update({});
    }, 1000);
  }

  cancelAdd() {
    if (this.isAddingInProgress) {
      return;
    }

    this.toggleAddMode(false);
  }

  isEditingCell(editingCell: number[][], i: number, j: number) {
    return editingCell[i]?.[j];
  }

  toggleEditCell(isEditing: boolean, i: number, j: number) {
    if (!isEditing) {
      this.editingModel.i = undefined;
      this.editingModel.colId = undefined;
      this.editingModel.value = undefined;
      this.isEditingInProgress = false;
      this.editingModelValid = false;
    }

    if (!this.editingCell[i]) {
      this.editingCell[i] = [];
    }

    this.editingCell[i][j] = isEditing;
    this.editingCell = [...this.editingCell];

    this.cdr.markForCheck();
  }

  onEditUpdated({ detail }: TableEditableEvent, i: number) {
    if (this.editingModel.i !== i && this.editingModel.colId !== detail.colId) {
      this.editingModel.value = undefined;
    }

    this.editingModel.i = i;
    this.editingModel.colId = detail.colId;
    this.editingModel.value = detail.value;

    this.editingModelValid = !!detail.value;

    console.log('onEditUpdated', this.editingModel);
  }

  submitEdit(data: TableDataRow, i: number, j: number) {
    if (this.isEditingInProgress || !this.editingModelValid) {
      return;
    }

    this.isEditingInProgress = true;
    console.log('Submitting edited row', this.editingModel, data);

    setTimeout(() => {
      this.isEditingInProgress = false;
      this.toggleEditCell(false, i, j);
      this.dataConfiguratorService?.update({});
    }, 1000);
  }

  cancelEdit(i: number, j: number) {
    if (this.isEditingInProgress) {
      return;
    }

    this.toggleEditCell(false, i, j);
  }

  checkIfIdExtists(config: any, columns: TableEditableColumn[]) {
    return columns.find(column => column.id === config.id);
  }
}
