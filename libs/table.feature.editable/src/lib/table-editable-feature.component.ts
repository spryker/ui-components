import { HttpClient } from '@angular/common/http';
import {
    AfterViewChecked,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Injector,
    NgZone,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { AjaxActionService } from '@spryker/ajax-action';
import { ButtonShape, ButtonSize, ButtonType, ButtonVariant } from '@spryker/button';
import { DataSerializerService } from '@spryker/data-serializer';
import { IconEditModule, IconPlusModule, IconWarningModule } from '@spryker/icon/icons';
import {
    TableColumn,
    TableColumnContext,
    TableColumns,
    TableDataRow,
    TableFeatureComponent,
    TableFeatureLocation,
    TableFeaturesRendererService,
} from '@spryker/table';
import { TableSettingsChangeEvent } from '@spryker/table.feature.settings';
import { AnyContext, ContextService, getElementOffset, provideInvokeContext } from '@spryker/utils';
import { NzResizeObserver } from 'ng-zorro-antd/cdk/resize-observer';
import { combineLatest, EMPTY, merge, Subject } from 'rxjs';
import {
    debounceTime,
    distinctUntilChanged,
    filter,
    map,
    pluck,
    shareReplay,
    skip,
    startWith,
    switchMap,
    takeUntil,
    tap,
} from 'rxjs/operators';

import { TableEditableEditRequestToken } from './tokens';
import {
    TableEditableColumn,
    TableEditableColumnTypeOptions,
    TableEditableConfig,
    TableEditableConfigDataErrors,
    TableEditableConfigDataErrorsFields,
    TableEditableConfigUrl,
    TableEditableEvent,
} from './types';
import { TableEditableService } from './table-editable-feature.service';

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
        TableEditableService,
    ],
})
export class TableEditableFeatureComponent
    extends TableFeatureComponent<TableEditableConfig>
    implements OnInit, AfterViewChecked, OnDestroy
{
    @ViewChild('editableCell') editableCell?: TemplateRef<any>;

    name = 'editable';
    editIcon = IconEditModule.icon;
    warningIcon = IconWarningModule.icon;
    addRowIcon = IconPlusModule.icon;
    tableFeatureLocation = TableFeatureLocation;
    buttonSize = ButtonSize;
    buttonVariant = ButtonVariant;
    buttonShape = ButtonShape;
    buttonType = ButtonType;
    syncInput: TableDataRow[] = [];
    stringifiedSyncInput?: string;
    url?: TableEditableConfigUrl;
    editingModel: TableEditCellModel = {};
    cellErrors?: TableEditableConfigDataErrors;
    rowErrors: TableEditableConfigDataErrorsFields[] = [];
    private tableElement?: HTMLElement;
    private tableDataLength = 0;
    private destroyed$ = new Subject<void>();

    tableColumns$ = this.table$.pipe(switchMap((table) => table.columns$));
    tableData$ = this.table$.pipe(switchMap((table) => table.data$));

    isAfterColsFeaturesExist$ = this.table$.pipe(
        switchMap((table) => table.features$),
        switchMap((features) =>
            this.tableFeaturesRendererService.trackFeatureRecords(features, this.tableFeatureLocation.afterCols),
        ),
        map((features) => features.some((feature) => feature.component.name !== this.name)),
        startWith(false),
    );
    mockRowData$ = this.tableColumns$.pipe(
        map((columns) =>
            columns.reduce((acc, column) => ({ ...acc, [column.id]: '' }), {
                editableNewRow: true,
            }),
        ),
    );
    editColumns$ = this.config$.pipe(pluck('columns'));
    createConfig$ = this.config$.pipe(pluck('create'), shareReplay({ bufferSize: 1, refCount: true }));
    updateConfig$ = this.config$.pipe(
        pluck('update'),
        tap((config) => (this.url = config?.url)),
        shareReplay({ bufferSize: 1, refCount: true }),
    );
    initialData$ = this.createConfig$.pipe(
        map((createConfig) => {
            if (createConfig?.initialData?.errors) {
                Object.entries(createConfig.initialData.errors).map(([key, value]) => {
                    this.rowErrors[key as unknown as number] = value;
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
    shouldAddAfterCols$ = combineLatest([this.createDataRows$, this.isAfterColsFeaturesExist$]).pipe(
        map(([createDataRows, isAfterColsFeaturesExist]) => createDataRows?.length && !isAfterColsFeaturesExist),
    );
    private updateTableElement$ = new Subject<HTMLElement>();
    private updateFloatCellsPosition$ = this.updateTableElement$.pipe(
        distinctUntilChanged(),
        switchMap((element) => (element ? this.resizeObserver.observe(element) : EMPTY)),
        debounceTime(200),
        map((entries) => entries[0].contentRect.width),
        tap(() => this.zone.run(() => this.updateFloatCellPosition())),
    );
    private updateFloatCellsPositionOnColumnConfigurator$ = this.tableEventBus$.pipe(
        switchMap((eventBus) => eventBus.on<TableSettingsChangeEvent>('columnConfigurator')),
        tap(({ visibilityChanged }) => {
            if (visibilityChanged !== undefined) {
                this.changeColsVisibilityAfterColumnConfigurator(visibilityChanged);
            }

            this.updateFloatCellPosition();
        }),
    );
    private updateEditableData$ = this.tableData$.pipe(
        tap(({ data }) => {
            this.tableEditableService.reset();
            data.forEach((row) => this.tableEditableService.addRow(row));
            [...this.syncInput].reverse().forEach((row) => this.tableEditableService.addRow(row));
            this.tableDataLength = data.length;
        }),
    );
    private shouldUnsubscribe$ = merge(
        this.destroyed$,
        this.updateTableElement$.pipe(
            distinctUntilChanged(),
            skip(1),
            filter((element) => !element),
        ),
    );
    disableRowKey$ = this.config$.pipe(map((config) => config.disableRowKey ?? '_editableRowDisabled'));

    constructor(
        injector: Injector,
        private cdr: ChangeDetectorRef,
        private ajaxActionService: AjaxActionService,
        private contextService: ContextService,
        private httpClient: HttpClient,
        private tableFeaturesRendererService: TableFeaturesRendererService,
        private resizeObserver: NzResizeObserver,
        private zone: NgZone,
        private dataSerializerService: DataSerializerService,
        /** @internal */
        public tableEditableService: TableEditableService,
    ) {
        super(injector);
    }

    ngOnInit() {
        this.updateFloatCellsPosition$.pipe(takeUntil(this.shouldUnsubscribe$)).subscribe();
        this.updateFloatCellsPositionOnColumnConfigurator$.pipe(takeUntil(this.shouldUnsubscribe$)).subscribe();
        this.updateEditableData$.pipe(takeUntil(this.destroyed$)).subscribe();
    }

    ngAfterViewChecked(): void {
        if (!this.tableElement && this.table?.tableElementRef) {
            this.tableElement = this.table?.tableElementRef?.nativeElement?.querySelector('table') as HTMLElement;
        }

        if (this.tableElement && !this.table?.tableElementRef) {
            this.tableElement = undefined;
        }

        if (this.tableElement) {
            this.updateTableElement$.next(this.tableElement);
        }
    }

    private changeColsVisibilityAfterColumnConfigurator(id: string): void {
        const transformedModel = Object.entries(this.editingModel).reduce((rows, [rowKey, rowValues]) => {
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
        }, {});

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
        setTimeout(() => {
            Object.entries(this.editingModel).forEach(([rowKey, rowValue]) => {
                if (!Object.keys(rowValue).length) {
                    return;
                }

                Object.entries(rowValue).forEach(([cellKey, cellValue]) => {
                    if (!cellValue) {
                        return;
                    }

                    this.setFloatCellPosition(Number(rowKey), cellKey, cellValue?.cellElement);
                });
            });
        });
    }

    /**
     * Adds new row to the table.
     */
    addRow(mockRowData: TableDataRow): void {
        const rowData = { ...mockRowData };

        this.syncInput = [rowData, ...this.syncInput];
        this.tableEditableService.addRow(rowData);
        this.stringifiedSyncInput = JSON.stringify(this.syncInput);
        this.updateRows$.next(this.syncInput);
        this.increaseRowErrorsIndex();
        this.cdr.detectChanges();
    }

    /**
     * Updates row config and syncs row value with {@link: syncInput}.
     */
    updateRows(event: TableEditableEvent, index: number): void {
        const { colId, value } = event.detail;

        this.syncInput = [...this.syncInput];
        this.syncInput[index][colId] = value;
        this.tableEditableService.updateModel(value, colId, this.getShiftedIndex(index));
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
        this.tableEditableService.removeRow(this.getShiftedIndex(index));
        this.syncInput = syncInput;
        this.stringifiedSyncInput = JSON.stringify(this.syncInput);
        this.updateRows$.next(this.syncInput);
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
        disableForCols: string[],
        config: TableColumn,
        columns: TableEditableColumn[],
        row: TableDataRow,
        disableRowKey: string,
    ): TableEditableColumn | undefined {
        if (!disableForCols?.includes(config.id) && !row?.[disableRowKey]) {
            return columns.find((column) => column.id === config.id);
        } else {
            return undefined;
        }
    }

    /**
     * Disables submit button until the cell value is edited at least once
     */
    isDisabledSubmit(rowIndex: number, cellIndex: number): boolean {
        return this.editingModel?.[rowIndex]?.[cellIndex]?.value === undefined;
    }

    isRowEditable(rowIndex: number, row: TableDataRow): boolean | undefined {
        return rowIndex === 0 && (row.editableNewRow as boolean);
    }

    isEditColumnEnabled(disableForCols: string[], columnId: string, row: TableDataRow, disableRowKey: string): boolean {
        return !disableForCols?.includes(columnId) && !row?.[disableRowKey];
    }

    getShiftedIndex(index: number): number {
        return this.tableDataLength + (this.syncInput.length - index - 1);
    }

    getRowError(rowIndex: number): string | undefined {
        return this.rowErrors?.[rowIndex]?.rowError;
    }

    setFloatCellPosition(rowIndex: number, cellIndex: string, cellElement?: HTMLElement) {
        if (!cellElement || !this.tableElement) {
            return;
        }

        this.editingModel = { ...this.editingModel };

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const tdElem = cellElement.closest('td')!;
        const { left: leftParentOffsetSum } = getElementOffset(tdElem, 'ant-table');
        const leftCellOffset = leftParentOffsetSum + cellElement.offsetWidth - this.tableElement.offsetWidth;

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.editingModel[rowIndex][cellIndex]!.cellElement = cellElement;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.editingModel[rowIndex][cellIndex]!.leftCellOffset = leftCellOffset > 0 ? `-${leftCellOffset}px` : '4px';

        this.updateFloatCellPosition();
        this.cdr.markForCheck();
    }

    openEditableCell(event: Event, rowIndex: number, cellIndex: number): void {
        event.stopPropagation();

        this.initEditingModel(rowIndex, cellIndex);
    }

    private initEditingModel(rowIndex: number, cellIndex: number): void {
        this.editingModel = { ...this.editingModel };

        if (!this.editingModel[rowIndex]) {
            this.editingModel[rowIndex] = {};
        }

        if (!this.editingModel[rowIndex][cellIndex]) {
            this.editingModel[rowIndex][cellIndex] = {
                isUpdating: true,
            };
        }
    }

    closeEditableCell(rowIndex: number, id: string, event?: Event): void {
        event?.stopPropagation();

        this.editingModel = { ...this.editingModel };
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

    onEditUpdated(event: TableEditableEvent, rowIndex: number, colId: string): void {
        const { value } = event.detail;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.editingModel[rowIndex][colId]!.value = value;
    }

    editableRowData(row: TableDataRow, id: TableColumn['id']): TableDataRow {
        const copiedRow = { ...row };

        if (copiedRow[id] === null || copiedRow[id] === undefined) {
            copiedRow[id] = '';
        }

        return copiedRow;
    }

    isCellUpdating(rowIndex: number, colId: string, editingModel: TableEditCellModel): boolean | undefined {
        return editingModel?.[rowIndex]?.[colId]?.isUpdating;
    }

    getLeftCellOffset(rowIndex: number, colId: string, editingModel: TableEditCellModel): string | undefined {
        return editingModel?.[rowIndex]?.[colId]?.leftCellOffset;
    }

    submitEdit(cellContext: TableColumnContext): void {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const url = typeof this.url === 'string' ? this.url : this.url!.url;
        const method = typeof this.url === 'string' ? 'GET' : this.url?.method;
        const parsedUrl = this.contextService.interpolate(url, cellContext as unknown as AnyContext);
        const value =
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.editingModel[cellContext.i][cellContext.config.id]!.value;
        const requestData = {
            [cellContext.config.id]: value,
        };

        this.httpClient
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            .request(method!, parsedUrl, {
                body: {
                    data: this.dataSerializerService.serialize(TableEditableEditRequestToken, requestData),
                },
            })
            .subscribe({
                next: (response) => {
                    this.ajaxActionService.handle(response, this.injector);
                    this.closeEditableCell(cellContext.i, cellContext.config.id);
                    this.tableEditableService.updateModel(
                        value,
                        cellContext.config.id,
                        cellContext.i + this.syncInput.length,
                    );
                },
                error: (error) => {
                    this.editingModel = { ...this.editingModel };
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    this.editingModel[cellContext.i][cellContext.config.id]!.value = undefined;
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
            });
    }

    trackNewColumnsById(index: number, item: TableColumn): string {
        return item.id;
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
    }
}
