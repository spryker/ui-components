import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Injector,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { AjaxActionService } from '@spryker/ajax-action';
import { ButtonSize, ButtonVariant } from '@spryker/button';
import {
  IconEditModule,
  IconPlusModule,
  IconWarningModule,
} from '@spryker/icon/icons';
import {
  TableColumn,
  TableColumnContext,
  TableColumns,
  TableDataRow,
  TableFeatureComponent,
  TableFeatureLocation,
  TableFeaturesRendererService,
} from '@spryker/table';
import {
  AnyContext,
  ContextService,
  provideInvokeContext,
} from '@spryker/utils';
import { TableSettingsChangeEvent } from '@spryker/table.feature.settings';
import { combineLatest, merge, Subject } from 'rxjs';
import {
  map,
  pluck,
  shareReplay,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';

import {
  TableEditableColumn,
  TableEditableColumnTypeOptions,
  TableEditableConfig,
  TableEditableConfigDataErrors,
  TableEditableConfigDataErrorsFields,
  TableEditableConfigUpdate,
  TableEditableConfigUrl,
  TableEditableEvent,
} from './types';

interface TableEditCellModel {
  [rowIdx: string]: {
    [columnId: string]:
      | {
          cellElement?: HTMLElement;
          leftCellOffset?: string;
          value?: unknown;
          isUpdating?: boolean;
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
export class TableEditableFeatureComponent
  extends TableFeatureComponent<TableEditableConfig>
  implements OnInit, OnDestroy {
  @ViewChild('editableCell') editableCell?: TemplateRef<any>;

  name = 'editable';
  editIcon = IconEditModule.icon;
  warningIcon = IconWarningModule.icon;
  addRowIcon = IconPlusModule.icon;
  tableFeatureLocation = TableFeatureLocation;
  buttonSize = ButtonSize;
  buttonVariant = ButtonVariant;

  constructor(
    injector: Injector,
    private cdr: ChangeDetectorRef,
    private ajaxActionService: AjaxActionService,
    private contextService: ContextService,
    private httpClient: HttpClient,
    private tableFeaturesRendererService: TableFeaturesRendererService,
  ) {
    super(injector);
  }

  syncInput: TableDataRow[] = [];
  stringifiedSyncInput?: string;
  url?: TableEditableConfigUrl;
  editingModel: TableEditCellModel = {};
  cellErrors?: TableEditableConfigDataErrors;
  rowErrors: TableEditableConfigDataErrorsFields[] = [];

  tableColumns$ = this.table$.pipe(switchMap((table) => table.columns$));
  isAfterColsFeaturesExist$ = this.table$.pipe(
    switchMap((table) => table.features$),
    switchMap((features) =>
      this.tableFeaturesRendererService.trackFeatureRecords(
        features,
        this.tableFeatureLocation.afterCols,
      ),
    ),
    map((features) =>
      features.some((feature) => feature.component.name !== this.name),
    ),
    startWith(false),
  );
  mockRowData$ = this.tableColumns$.pipe(
    map((columns) =>
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
    tap((config) => (this.url = config?.url)),
    shareReplay({ bufferSize: 1, refCount: true }),
  );
  initialData$ = this.createConfig$.pipe(
    map((createConfig) => {
      if (createConfig?.initialData?.errors) {
        Object.entries(createConfig.initialData.errors).map(([key, value]) => {
          this.rowErrors[(key as unknown) as number] = value;
        });
      }

      const data = createConfig?.initialData?.data ?? [];

      this.syncInput = [...(data as TableDataRow[])];
      this.stringifiedSyncInput = JSON.stringify(this.syncInput);
      // Fix ExpressionChangedAfterItHasBeenCheckedError error
      this.cdr.detectChanges();

      return data;
    }),
  );
  updateRows$ = new Subject<TableDataRow[]>();
  createDataRows$ = merge(this.initialData$, this.updateRows$).pipe(
    map((rows) => ((rows as TableDataRow[]).length ? rows : null)),
    shareReplay({ bufferSize: 1, refCount: true }),
  );
  shouldAddAfterCols$ = combineLatest([
    this.createDataRows$,
    this.isAfterColsFeaturesExist$,
  ]).pipe(
    map(
      ([createDataRows, isAfterColsFeaturesExist]) =>
        createDataRows?.length && !isAfterColsFeaturesExist,
    ),
  );
  private destroyed$ = new Subject<void>();

  ngOnInit() {
    this.tableEventBus$
      .pipe(
        switchMap((eventBus) =>
          eventBus.on<TableSettingsChangeEvent>('columnConfigurator'),
        ),
        takeUntil(this.destroyed$),
      )
      .subscribe((data) => {
        const { visibilityChanged } = data;

        if (visibilityChanged === undefined) {
          this.updateFloatCellPosition();

          return;
        }

        this.changeColsVisibilityAfterColumnConfigurator(visibilityChanged);
        this.updateFloatCellPosition();
      });
  }

  private changeColsVisibilityAfterColumnConfigurator(id: string): void {
    const transformedModel = Object.entries(this.editingModel).reduce(
      (rows, [rowKey, rowValues]) => {
        if (!rowValues) {
          return rows;
        }

        const transformedRow = {
          ...rowValues,
          [id]: undefined,
        };

        return {
          ...rows,
          [rowKey]: transformedRow,
        };
      },
      {},
    );

    this.editingModel = transformedModel;
  }

  /**
   * Creates and return custom edit column.
   */
  getEditColumn(
    column: TableColumn,
    editColumns: TableColumns,
    index?: number,
    errors?: TableEditableConfigDataErrors,
  ): TableColumn {
    const editColumn = editColumns.find((c) => c.id === column.id) ?? column;

    if (index !== undefined && errors?.[index]?.columnErrors?.[column.id]) {
      const cloneEditColumn = { ...editColumn };
      const cloneTypeOptions: TableEditableColumnTypeOptions = {
        ...cloneEditColumn.typeOptions,
      };

      cloneTypeOptions.editableError = errors[index]?.columnErrors?.[column.id];
      cloneEditColumn.typeOptions = cloneTypeOptions;

      return cloneEditColumn;
    }

    return editColumn;
  }

  private updateFloatCellPosition(): void {
    Object.entries(this.editingModel).forEach(([rowKey, rowValue]) => {
      if (!rowValue) {
        return;
      }

      Object.entries(rowValue).forEach(([cellKey, cellValue]) => {
        if (!cellValue) {
          return;
        }

        setTimeout(() => {
          this.setFloatCellPosition(
            Number(rowKey),
            cellKey,
            cellValue?.cellElement,
          );
        }, 0);
      });
    });
  }

  /**
   * Adds new row to the table.
   */
  addRow(mockRowData: TableDataRow): void {
    this.syncInput = [{ ...mockRowData }, ...this.syncInput];
    this.stringifiedSyncInput = JSON.stringify(this.syncInput);
    this.updateRows$.next(this.syncInput);
    this.increaseRowErrorsIndex();
    this.cdr.markForCheck();
    this.updateFloatCellPosition();
  }

  /**
   * Updates row config and syncs row value with {@link: syncInput}.
   */
  updateRows(event: TableEditableEvent, index: number): void {
    const { colId, value } = event.detail;

    this.syncInput = [...this.syncInput];
    this.syncInput[index][colId] = value;
    this.stringifiedSyncInput = JSON.stringify(this.syncInput);
    this.updateRows$.next(this.syncInput);
    this.cdr.markForCheck();
  }

  /**
   * Deletes row from the table.
   */
  cancelAddRow(index: number): void {
    const isExistItems = this.syncInput?.[index];

    if (!isExistItems) {
      return;
    }

    const syncInput = [...this.syncInput];
    syncInput.splice(index, 1);

    this.syncInput = syncInput;
    this.stringifiedSyncInput = JSON.stringify(this.syncInput);
    this.updateRows$.next(this.syncInput);
    this.decreaseRowErrorsIndex(index);
    this.cdr.markForCheck();
    this.updateFloatCellPosition();
  }

  private increaseRowErrorsIndex(): void {
    this.rowErrors = [{}, ...this.rowErrors];
  }

  private decreaseRowErrorsIndex(index: number): void {
    const rowErrors = [...this.rowErrors];
    rowErrors.splice(index, 1);

    this.rowErrors = rowErrors;
  }

  findColumnByColumn(
    config: TableColumn,
    columns: TableEditableColumn[],
  ): TableEditableColumn | undefined {
    return columns.find((column) => column.id === config.id);
  }

  /**
   * Disables submit button until the cell value is edited at least once
   */
  isDisabledSubmit(rowIndex: number, cellIndex: number): boolean {
    return this.editingModel?.[rowIndex]?.[cellIndex]?.value === undefined;
  }

  getRowError(rowIndex: number): string | undefined {
    return this.rowErrors?.[rowIndex]?.rowError;
  }

  getLeftParentOffsetSum(element: HTMLElement) {
    let left = 0;

    while (!element.classList.contains('ant-table')) {
      left += element.offsetLeft;
      element = element.offsetParent as HTMLElement;
    }

    return left;
  }

  setFloatCellPosition(
    rowIndex: number,
    cellIndex: string,
    cellElement?: HTMLElement,
  ) {
    if (!cellElement) {
      return;
    }

    // tslint:disable-next-line: no-non-null-assertion
    const tableElem = cellElement.closest('table')!;
    // tslint:disable-next-line: no-non-null-assertion
    const tdElem = cellElement.closest('td')!;
    const leftParentOffsetSum = this.getLeftParentOffsetSum(tdElem);
    const leftCellOffset =
      leftParentOffsetSum + cellElement.offsetWidth - tableElem.offsetWidth;

    // tslint:disable-next-line: no-non-null-assertion
    this.editingModel[rowIndex][cellIndex]!.cellElement = cellElement;
    // tslint:disable-next-line: no-non-null-assertion
    this.editingModel[rowIndex][cellIndex]!.leftCellOffset =
      leftCellOffset > 0 ? `-${leftCellOffset}px` : '0';

    this.cdr.markForCheck();
  }

  /**
   * Opens custom editable template via {@link Overlay}.
   */
  openEditableCell(event: Event, rowIndex: number, cellIndex: number): void {
    event.stopPropagation();

    this.initEditingModel(rowIndex, cellIndex);
  }

  private initEditingModel(rowIndex: number, cellIndex: number): void {
    if (!this.editingModel[rowIndex]) {
      this.editingModel[rowIndex] = {};
    }

    if (!this.editingModel[rowIndex][cellIndex]) {
      this.editingModel[rowIndex][cellIndex] = {
        isUpdating: true,
      };
    }
  }

  closeEditableCell(rowIndex: number, id: string): void {
    // tslint:disable-next-line: no-non-null-assertion
    this.editingModel[rowIndex][id] = undefined;
    this.cellErrors = {
      ...this.cellErrors,
      [rowIndex]: {
        ...this.cellErrors?.[rowIndex],
        columnErrors: {
          ...this.cellErrors?.[rowIndex]?.columnErrors,
          [id]: undefined,
        },
      },
    };
  }

  onEditUpdated(
    event: TableEditableEvent,
    rowIndex: number,
    cellIndex: number,
  ): void {
    const { value } = event.detail;

    // tslint:disable-next-line: no-non-null-assertion
    this.editingModel[rowIndex][cellIndex]!.value = value;
  }

  isCellUpdating(rowIndex: number, cellIndex: number): boolean | undefined {
    return this.editingModel?.[rowIndex]?.[cellIndex]?.isUpdating;
  }

  getLeftCellOffset(rowIndex: number, cellIndex: number): string | undefined {
    return this.editingModel?.[rowIndex]?.[cellIndex]?.leftCellOffset;
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
        body: {
          data: {
            // tslint:disable-next-line: no-non-null-assertion
            [cellContext.config.id]: this.editingModel[cellContext.i][
              cellContext.config.id
            ]!.value,
          },
        },
      })
      .subscribe(
        (response) => {
          this.ajaxActionService.handle(response, this.injector);
          this.closeEditableCell(cellContext.i, cellContext.config.id);
        },
        (error) => {
          // tslint:disable-next-line: no-non-null-assertion
          this.editingModel[cellContext.i][
            cellContext.config.id
          ]!.value = undefined;
          this.cellErrors = {
            ...this.cellErrors,
            [cellContext.j]: {
              ...this.cellErrors?.[cellContext.j],
              columnErrors: {
                ...this.cellErrors?.[cellContext.j].columnErrors,
                [cellContext.config.id]: error,
              },
            },
          };
        },
      );
  }

  trackNewColumnsById(index: number, item: TableColumn): string {
    return item.id;
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}
