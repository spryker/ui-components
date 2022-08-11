import { Type } from '@angular/core';
import { Observable } from 'rxjs';

import { as } from './util/types';

export interface NgWebComponentBase<T> {
    getNgType(): Type<T>;
    getSuper(): T;
    whenInit(): Observable<void>;
}

export type NgWebComponent<T> = T & NgWebComponentBase<T>;

export function isNgWebComponent<T>(obj: unknown): obj is NgWebComponent<T> {
    as<NgWebComponent<T>>(obj);
    return (
        obj &&
        typeof obj.getNgType === 'function' &&
        typeof obj.getSuper === 'function' &&
        typeof obj.whenInit === 'function'
    );
}

export function isNgWebComponentOf<T>(type: Type<T>) {
    return (obj: unknown): obj is NgWebComponent<T> =>
        isNgWebComponent<Type<T>>(obj) ? obj.getSuper() instanceof type : false;
}
