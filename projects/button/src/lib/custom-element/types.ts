import { Type } from '@angular/core';

export interface WebComponentType<T = any> extends Type<T> {
  selector?: string;
}

export interface WebComponentDeclaration<
  T extends WebComponentType<any> = any
> {
  component: T;
  selector?: string;
  exposeAllMethod?: true;
}

export type WebComponentDef = WebComponentType | WebComponentDeclaration;
export type WebComponentDefs = WebComponentDef[];
