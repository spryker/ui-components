import { Type } from '@angular/core';

import { Modal } from './types';

export function asModalBase<TData, TResult>() {
  return <T extends Type<any>>(base: T) =>
    asModalMixin<TData, TResult, T>(base);
}

export function asModal<TData, TResult>() {
  return asModalMixin<TData, TResult>();
}

function asModalMixin<TData, TResult, T extends Type<any>>(
  base: T,
): Type<Modal<TData, TResult>> & T;
function asModalMixin<TData, TResult>(): Type<Modal<TData, TResult>>;
function asModalMixin<TData, TResult, T extends Type<any>>(
  base: T = class {} as T,
): Type<Modal<TData, TResult>> & T {
  return class ModalMixin extends base {};
}
