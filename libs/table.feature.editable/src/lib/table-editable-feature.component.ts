import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Injector,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
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
  TableEditableConfigDataErrors,
  TableEditableConfigUpdate,
  TableEditableConfigUrl,
  TableEditableEvent,
} from './types';

interface TableEditCellModel {
  [rowIdx: string]: {
    [columnId: string]:
      | {
          isEditMode?: boolean;
          value?: unknown;
          overlayRef?: any;
        }
      | undefined;
  };
}

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
  @ViewChild('editableCell') editableCell?: TemplateRef<any>;

  overlayRef?: OverlayRef | null;
  test?: any;

  name = 'editable';
  editIcon = IconActionModule.icon;
  checkIcon = IconCheckModule.icon;
  removeIcon = IconRemoveModule.icon;
  tableLocation = TableFeatureLocation;
  buttonSize = ButtonSize;
  buttonVariant = ButtonVariant;
  popoverTrigger = PopoverTrigger;
  popoverPosition = PopoverPosition;

  constructor(
    injector: Injector,
    private cdr: ChangeDetectorRef,
    private ajaxActionService: AjaxActionService,
    private contextService: ContextService,
    private httpClient: HttpClient,
    private overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
  ) {
    super(injector);
  }

  syncInput: TableDataRow[] = [];
  stringifiedSyncInput?: string;
  url?: TableEditableConfigUrl;

  editingModel: TableEditCellModel = {};
  cellErrors?: TableEditableConfigDataErrors;

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
    errors?: TableEditableConfigDataErrors,
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
    config: TableColumn,
    columns: TableEditableColumn[],
  ): TableEditableColumn | undefined {
    return columns.find(column => column.id === config.id);
  }

  isEditingCell(
    editingModel: TableEditCellModel,
    rowIndex: number,
    cellIndex: number,
  ): boolean {
    return Boolean(editingModel?.[rowIndex]?.[cellIndex]?.isEditMode);
  }

  isDisabledSubmit(rowIndex: number, cellIndex: number): boolean {
    return this.editingModel?.[rowIndex]?.[cellIndex]?.value === undefined;
  }

  openEditableCell(
    rowIndex: number,
    cellIndex: number,
    updateConfig: TableEditableConfigUpdate,
    row: TableColumn[],
    cellContext: TableColumnContext,
    editColumns: TableColumn[],
    elementRef: ElementRef,
  ): void {
    const config = this.getEditColumn(
      cellContext.config,
      editColumns,
      rowIndex,
      this.cellErrors,
    );
    const positionStrategy = this.overlay
      .position()
      // .connectedTo(
      //   elementRef,
      //   { originX: 'start', originY: 'center' },
      //   {
      //     overlayX: 'start',
      //     overlayY: 'center',
      //   },
      // )
      .flexibleConnectedTo(elementRef)
      .withPositions([
        {
          originX: 'start',
          originY: 'center',
          overlayX: 'start',
          overlayY: 'center',
        },
      ])
      .withLockedPosition(true);

    const overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition({
        scrollThrottle: 10,
      }),
    });

    overlayRef.attach(
      // tslint:disable-next-line: no-non-null-assertion
      new TemplatePortal(this.editableCell!, this.viewContainerRef, {
        $implicit: updateConfig,
        i: rowIndex,
        j: cellIndex,
        row,
        cellContext,
        config,
      }),
    );

    this.modelCreation(rowIndex, cellIndex);
    // tslint:disable-next-line: no-non-null-assertion
    this.editingModel[rowIndex][cellIndex]!.overlayRef = overlayRef;
  }

  modelCreation(rowIndex: number, cellIndex: number): void {
    if (!this.editingModel[rowIndex]) {
      this.editingModel[rowIndex] = {};
    }

    if (!this.editingModel[rowIndex][cellIndex]) {
      this.editingModel[rowIndex][cellIndex] = {};
    }
  }

  closeEditableCell(rowIndex: number, cellIndex: number): void {
    // tslint:disable-next-line: no-non-null-assertion
    this.editingModel[rowIndex][cellIndex]!.overlayRef.detach();
    this.editingModel[rowIndex][cellIndex] = undefined;
  }

  onEditUpdated(
    event: TableEditableEvent,
    rowIndex: number,
    cellIndex: number,
  ): void {
    const { value } = event.detail;

    this.modelCreation(rowIndex, cellIndex);
    // tslint:disable-next-line: no-non-null-assertion
    this.editingModel[rowIndex][cellIndex]!.value = value;
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
          // tslint:disable-next-line: no-non-null-assertion
          this.editingModel[cellContext.i][cellContext.j]!.value = undefined;
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
