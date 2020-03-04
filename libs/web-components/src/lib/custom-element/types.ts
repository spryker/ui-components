import { Type } from '@angular/core';

export interface WebComponentType<T = any> extends Type<T> {
  selector?: string;
}

interface WebComponentDeclarationBase {
  selector?: string;
  exposeAllMethod?: true;
}

export interface WebComponentDeclarationStatic<T extends WebComponentType>
  extends WebComponentDeclarationBase {
  component: T;
}

export interface WebComponentDeclarationLazy<T extends WebComponentType>
  extends WebComponentDeclarationBase {
  selector: string;
  component: () => Promise<T>;
  lazy: true;
}

export type WebComponentDeclaration<
  T extends WebComponentType = WebComponentType
> = WebComponentDeclarationStatic<T> | WebComponentDeclarationLazy<T>;

export type WebComponentDef = WebComponentType | WebComponentDeclaration;
export type WebComponentDefs = WebComponentDef[];
