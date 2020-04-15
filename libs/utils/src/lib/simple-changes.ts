import { SimpleChange } from '@angular/core';

export interface TypedSimpleChange<T> extends SimpleChange {
  previousValue: T;
  currentValue: T;
}

export type TypedSimpleChanges<T> = {
  [P in keyof T]?: TypedSimpleChange<T[P]>;
};
