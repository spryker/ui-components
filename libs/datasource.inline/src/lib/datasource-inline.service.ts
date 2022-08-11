import { Injectable, Injector } from '@angular/core';
import { Datasource } from '@spryker/datasource';
import { Observable, of } from 'rxjs';

import { DatasourceInlineConfig } from './types';

@Injectable({
    providedIn: 'root',
})
export class DatasourceInlineService implements Datasource {
    resolve(injector: Injector, config: DatasourceInlineConfig): Observable<unknown> {
        return of(config.data);
    }
}
