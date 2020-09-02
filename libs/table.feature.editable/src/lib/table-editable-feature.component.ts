import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
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
import { provideInvokeContext } from '@spryker/utils';
import { map, pluck, switchMap } from 'rxjs/operators';

import { TableEditableConfig, TableEditableEvent } from './types';

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
export class TableEditableFeatureComponent
  extends TableFeatureComponent<TableEditableConfig>
  implements OnInit {
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
  addRowButton$ = this.config$.pipe(
    pluck('addRowButton'),
    map(btn => ({ icon: this.checkIcon, title: '', ...btn })),
  );
  submitRowButton$ = this.config$.pipe(
    pluck('submitRowButton'),
    map(btn => ({ title: 'Submit', icon: '', ...btn })),
  );
  cancelRowButton$ = this.config$.pipe(
    pluck('cancelRowButton'),
    map(btn => ({ title: 'Cancel', icon: '', ...btn })),
  );

  ngOnInit(): void {}

  toggleAddMode(isAdding: boolean) {
    this.isAddingMode = isAdding;
    this.isAddingInProgress = false;
    this.addModelValid = false;
    this.canAddRow = false;
    this.addModel = {};
    this.cdr.markForCheck();
  }

  getEditColumn(column: TableColumn, editColumns: TableColumns): TableColumn {
    return editColumns.find(c => c.id === column.id) ?? column;
  }

  onAddUpdated({ detail }: TableEditableEvent) {
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
}
