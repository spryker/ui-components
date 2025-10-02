import { Injectable, InjectionToken, Injector } from '@angular/core';
import { TableColumnContext } from './table';

export const TableColumnLocalContextToken = new InjectionToken<() => TableColumnContext>('LOCAL_GET_CONTEXT');

@Injectable({ providedIn: 'root' })
export class TableColumnService {
    getContext(injector: Injector): TableColumnContext {
        return injector.get(TableColumnLocalContextToken)();
    }
}
