import { ElementRef, Injectable, OnDestroy } from '@angular/core';
import { Observable, OperatorFunction, Subject } from 'rxjs';
import { distinctUntilChanged, map, scan } from 'rxjs/operators';

import { TableEditableColumn, TableEditableEvent } from './types';

interface ModelOperationAdd {
  rowAddedAt: number;
}

interface ModelOperationUpdate {
  rowUpdatedAt: number;
}

interface ModelOperationRemove {
  rowRemovedAt: number;
}

type ModelOperation =
  | ModelOperationAdd
  | ModelOperationUpdate
  | ModelOperationRemove;

@Injectable()
export class TableEditableService implements OnDestroy {
  private model: Record<string, unknown>[] = [];
  private modelUpdates$ = new Subject<ModelOperation>();

  constructor(private elementRef: ElementRef) {}

  ngOnDestroy(): void {
    this.modelUpdates$.complete();
    this.reset();
  }

  reset() {
    for (let i = this.model.length - 1; i >= 0; i--) {
      this.removeRow(i);
    }
  }

  addRow(rowModel: Record<string, unknown>) {
    const rowIndex = this.model.push(rowModel);
  
    this.modelUpdates$.next({ rowAddedAt: rowIndex });
  }

  updateModel(value: unknown, colId: string, rowIdx: number) {
    // this.maybeInitRows(rowIdx);

    this.model[rowIdx][colId] = value;
    this.modelUpdates$.next({ rowAddedAt: rowIdx });
  }

  updateValue(value: string, column: TableEditableColumn): void {
    this.elementRef.nativeElement.dispatchEvent(
      new TableEditableEvent({ value: value, colId: column.id }),
    );
  }

  removeRow(rowIdx: number) {
    if (rowIdx >= this.model.length) {
      return;
    }

    this.model.splice(rowIdx, 1);
    this.modelUpdates$.next({ rowRemovedAt: rowIdx });
  }

  getValueFor(colId: string, rowIdx: number): unknown {
    return this.model?.[rowIdx]?.[colId];
  }

  getUpdatesFor(colId: string, rowIdx: number): Observable<unknown> {
    return this.modelUpdates$.pipe(
      this.trackRowIdx(rowIdx),
      map((trackedRowIdx) => this.getValueFor(colId, trackedRowIdx)),
      distinctUntilChanged(),
    );
  }

  private maybeInitRows(rowIdx: number) {
    const rowsDiff = rowIdx - this.model.length + 1;

    if (rowsDiff < 1) {
      return;
    }

    for (let i = 0; i < rowsDiff; i++) {
      this.model.push({});
    }
  }

  private trackRowIdx(
    originalRowIdx: number,
  ): OperatorFunction<ModelOperation, number> {
    return (o$) =>
      o$.pipe(
        scan((lastRowIdx, update) => {
          if ('rowAddedAt' in update && lastRowIdx >= update.rowAddedAt) {
            return lastRowIdx + 1;
          }

          if ('rowRemovedAt' in update && lastRowIdx >= update.rowRemovedAt) {
            return lastRowIdx - 1;
          }

          return lastRowIdx;
        }, originalRowIdx),
      );
  }
}
