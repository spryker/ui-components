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
import { combineLatest, merge, Subject } from 'rxjs';
import {
  map,
  pluck,
  shareReplay,
  startWith,
  switchMap,
  take,
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
          value?: unknown;
          overlayRef?: OverlayRef;
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
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
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
  isCellFeatureExist$ = this.table$.pipe(
    switchMap((table) => table.features$),
    switchMap((features) =>
      this.tableFeaturesRendererService.trackFeatureRecords(
        features,
        this.tableFeatureLocation.afterCols,
      ),
    ),
    take(1),
    map((features) => features.length - 1 > 0),
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
  shouldAddAdditionalCells$ = combineLatest([
    this.createDataRows$,
    this.isCellFeatureExist$.pipe(startWith(false)),
  ]).pipe(
    map(
      ([createDataRows, isCellFeatureExist]) =>
        createDataRows?.length && !isCellFeatureExist,
    ),
  );

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

  private updateOverlayPosition(): void {
    setTimeout(() => {
      Object.values(this.editingModel).forEach((rowValue) => {
        if (rowValue) {
          Object.values(rowValue).forEach((cellValue) => {
            cellValue?.overlayRef?.updatePosition();
          });
        }
      });
    }, 0);
  }

  /**
   * Adds new row to the table.
   */
  addRow(mockRowData: TableDataRow): void {
    this.syncInput = [{ ...mockRowData }, ...this.syncInput];
    this.stringifiedSyncInput = JSON.stringify(this.syncInput);
    this.updateRows$.next(this.syncInput);
    this.updateOverlayPosition();
    this.increaseRowErrorsIndex();
    this.cdr.markForCheck();
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
    this.updateOverlayPosition();
    this.decreaseRowErrorsIndex(index);
    this.cdr.markForCheck();
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

  /**
   * Opens custom editable template via {@link Overlay}.
   */
  openEditableCell(
    event: Event,
    rowIndex: number,
    cellIndex: number,
    updateConfig: TableEditableConfigUpdate,
    row: TableColumn[],
    cellContext: TableColumnContext,
    editColumns: TableColumn[],
    elementRef: ElementRef,
  ): void {
    event.stopPropagation();

    const config = this.getEditColumn(
      cellContext.config,
      editColumns,
      rowIndex,
      this.cellErrors,
    );
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(elementRef)
      .withPositions([
        {
          originX: 'start',
          originY: 'center',
          overlayX: 'start',
          overlayY: 'center',
        },
      ]);

    const overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
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

    this.initEditingModel(rowIndex, cellIndex);
    // tslint:disable-next-line: no-non-null-assertion
    this.editingModel[rowIndex][cellIndex]!.overlayRef = overlayRef;
  }

  private initEditingModel(rowIndex: number, cellIndex: number): void {
    if (!this.editingModel[rowIndex]) {
      this.editingModel[rowIndex] = {};
    }

    if (!this.editingModel[rowIndex][cellIndex]) {
      this.editingModel[rowIndex][cellIndex] = {};
    }
  }

  closeEditableCell(rowIndex: number, cellIndex: number, id: string): void {
    this.editingModel[rowIndex][cellIndex]?.overlayRef?.dispose();
    this.editingModel[rowIndex][cellIndex] = undefined;
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
              cellContext.j
            ]!.value,
          },
        },
      })
      .subscribe(
        (response) => {
          this.ajaxActionService.handle(response, this.injector);
          this.closeEditableCell(
            cellContext.i,
            cellContext.j,
            cellContext.config.id,
          );
        },
        (error) => {
          // tslint:disable-next-line: no-non-null-assertion
          this.editingModel[cellContext.i][cellContext.j]!.value = undefined;
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

  ngOnDestroy(): void {
    Object.values(this.editingModel).forEach((rowValue) => {
      if (rowValue) {
        Object.values(rowValue).forEach((cellValue) => {
          cellValue?.overlayRef?.dispose();
        });
      }
    });
  }

  trackNewColumnsById(index: number, item: TableColumn): string {
    return item.id;
  }
}
