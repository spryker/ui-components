import { Injectable, ElementRef } from '@angular/core';
import { TableEditableEvent } from './types';

@Injectable()
export class TableEditableService {
  constructor(private elementRef: ElementRef) {}

  updateValue(value: any, column: any) {
    console.log(value, column);
    this.elementRef.nativeElement.dispatchEvent(
      new TableEditableEvent({ value: value, colId: column.id }),
    );
  }
}
