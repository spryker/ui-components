import { Injectable, Injector } from '@angular/core';
import { LOCAL_GET_CONTEXT, LocalGetContextToken } from '@orchestrator/core';

import { TableColumnContext } from './table';

@Injectable({ providedIn: 'root' })
export class TableColumnService {
  getContext(injector: Injector): TableColumnContext {
    const getLocalContext =
      injector.get<LocalGetContextToken>(LOCAL_GET_CONTEXT);

    return getLocalContext();
  }
}
