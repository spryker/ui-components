import { Type } from '@angular/core';

import { as, InferType } from './util/types';

export interface NgWebComponentBase<T> {
  getNgType(): Type<T>;
  getSuper(): T;
}

export type NgWebComponent<T> = T & NgWebComponentBase<T>;

export function isNgWebComponent<T extends Type<any>>(
  obj: unknown,
): obj is NgWebComponent<InferType<T>> {
  as<NgWebComponent<InferType<T>>>(obj);
  return (
    obj &&
    typeof obj.getNgType === 'function' &&
    typeof obj.getSuper === 'function'
  );
}

export function isNgWebComponentOf<T>(type: Type<T>) {
  return (obj: unknown): obj is NgWebComponent<T> =>
    isNgWebComponent<Type<T>>(obj) ? obj.getSuper() instanceof type : false;
}
