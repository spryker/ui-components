import { Injectable, ElementRef } from '@angular/core';
import { TableEditableColumn, TableEditableEvent } from './types';

@Injectable()
export class TableEditableService {
  constructor(private elementRef: ElementRef) {}

  updateValue(value: string, column: TableEditableColumn): void {
    this.elementRef.nativeElement.dispatchEvent(
      new TableEditableEvent({ value: value, colId: column.id }),
    );
  }
}
