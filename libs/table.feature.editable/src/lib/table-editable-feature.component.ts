import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { AjaxActionService } from '@spryker/ajax-action';
import { ButtonSize, ButtonVariant } from '@spryker/button';
import {
  IconActionModule,
  IconCheckModule,
  IconRemoveModule,
} from '@spryker/icon/icons';
import { PopoverPosition, PopoverTrigger } from '@spryker/popover';
import {
  TableColumn,
  TableColumnContext,
  TableColumns,
  TableDataRow,
  TableFeatureComponent,
  TableFeatureLocation,
} from '@spryker/table';
import {
  AnyContext,
  ContextService,
  provideInvokeContext,
} from '@spryker/utils';
import { Subject } from 'rxjs';
import {
  map,
  pluck,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';

import {
  TableEditableColumn,
  TableEditableColumnTypeOptions,
  TableEditableConfig,
  TableEditableConfigUrl,
  TableEditableEvent,
} from './types';

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

  syncInput: TableDataRow[] = [];
  stringifiedSyncInput?: string;
  url?: TableEditableConfigUrl;

  editingModel: any = {};
  cellErrors?: any;

  tableColumns$ = this.table$.pipe(switchMap(table => table.columns$));
  mockRowData$ = this.tableColumns$.pipe(
    map(columns =>
      columns.reduce((acc, column) => ({ ...acc, [column.id]: '' }), {}),
    ),
  );

  editColumns$ = this.config$.pipe(pluck('columns'));

  createConfig$ = this.config$.pipe(
    pluck('create'),
    shareReplay({ bufferSize: 1, refCount: true }),
  );
  updateConfig$ = this.config$.pipe(
    pluck('update'),
    tap(config => (this.url = config?.url)),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  initialData$ = this.createConfig$.pipe(
    pluck('initialData', 'data'),
    tap(data => {
      if (data) {
        this.syncInput = [...(data as TableDataRow[])];
        this.stringifiedSyncInput = JSON.stringify(this.syncInput);
      }
    }),
  );
  updateRows$ = new Subject<TableDataRow[]>();

  createDataRows$ = this.initialData$.pipe(
    switchMap(initialData => this.updateRows$.pipe(startWith(initialData))),
    map(rows => ((rows as TableDataRow[]).length ? rows : null)),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  getEditColumn(
    column: TableColumn,
    editColumns: TableColumns,
    index?: number,
    errors?: Record<any, Record<string, string>>,
  ): TableColumn {
    const editColumn = editColumns.find(c => c.id === column.id) ?? column;

    if (index !== undefined && errors?.[index]?.[column.id]) {
      const cloneEditColumn = { ...editColumn };
      const cloneTypeOptions: TableEditableColumnTypeOptions = {
        ...cloneEditColumn.typeOptions,
      };

      cloneTypeOptions.editableError = errors[index][column.id];
      cloneEditColumn.typeOptions = cloneTypeOptions;

      return cloneEditColumn;
    }

    return editColumn;
  }

  addRow(mockRowData: TableDataRow): void {
    this.syncInput = [mockRowData, ...this.syncInput];
    this.stringifiedSyncInput = JSON.stringify(this.syncInput);
    this.updateRows$.next(this.syncInput);
  }

  updateRows(event: TableEditableEvent, index: number): void {
    const { colId, value } = event.detail;
    this.syncInput[index] = {
      ...this.syncInput[index],
      [colId]: value,
    };

    this.stringifiedSyncInput = JSON.stringify(this.syncInput);
    this.updateRows$.next(this.syncInput);
    this.cdr.markForCheck();
  }

  cancelAddRow(index: number): void {
    const isExistItems = this.syncInput?.[index];

    if (!isExistItems) {
      return;
    }

    const syncInput = [...this.syncInput];
    syncInput.splice(index, 1);

    this.syncInput = [...syncInput];
    this.stringifiedSyncInput = JSON.stringify(this.syncInput);
    this.updateRows$.next(this.syncInput);
    this.cdr.markForCheck();
  }

  checkIfIdExtists(
    config: any,
    columns: TableEditableColumn[],
  ): TableEditableColumn | undefined {
    return columns.find(column => column.id === config.id);
  }

  isEditingCell(
    editingModel: any,
    rowIndex: number,
    cellIndex: number,
  ): boolean {
    return editingModel?.[rowIndex]?.[cellIndex]?.isEditMode;
  }

  isDisabledSubmit(rowIndex: number, cellIndex: number): boolean {
    return this.editingModel?.[rowIndex]?.[cellIndex].value === undefined;
  }

  toggleEditCell(
    isEditing: boolean,
    rowIndex: number,
    cellIndex: number,
  ): void {
    if (!isEditing) {
      this.editingModel[rowIndex][cellIndex] = undefined;
    }

    if (isEditing) {
      if (!this.editingModel[rowIndex]) {
        this.editingModel[rowIndex] = {};
      }

      if (!this.editingModel[rowIndex][cellIndex]) {
        this.editingModel[rowIndex][cellIndex] = {};
      }

      this.editingModel[rowIndex][cellIndex].isEditMode = isEditing;
    }

    this.editingModel = { ...this.editingModel };
    this.cdr.markForCheck();
  }

  onEditUpdated(
    event: TableEditableEvent,
    rowIndex: number,
    cellIndex: number,
  ): void {
    const { value } = event.detail;

    if (!this.editingModel[rowIndex]) {
      this.editingModel[rowIndex] = {};
    }

    if (!this.editingModel[rowIndex][cellIndex]) {
      this.editingModel[rowIndex][cellIndex] = {};
    }

    this.editingModel[rowIndex][cellIndex].value = value;
    this.editingModel = { ...this.editingModel };
    this.cdr.markForCheck();
  }

  submitEdit(cellContext: TableColumnContext): void {
    // tslint:disable-next-line: no-non-null-assertion
    const url = typeof this.url === 'string' ? this.url : this.url!.url;
    const method = typeof this.url === 'string' ? 'GET' : this.url?.method;
    const parsedUrl = this.contextService.interpolate(
      url,
      (cellContext as unknown) as AnyContext,
    );

    this.httpClient
      // tslint:disable-next-line: no-non-null-assertion
      .request(method!, parsedUrl, {
        body: { columnId: cellContext.config.id, value: cellContext.value },
      })
      .subscribe(
        response => {
          this.ajaxActionService.handle(response, this.injector);
        },
        error => {
          this.cellErrors = {
            [cellContext.j]: {
              [cellContext.config.id]: error,
            },
          };
        },
      );
  }

  trackNewRowByIndex(index: number): number {
    return index;
  }
}
