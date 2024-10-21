import { Injectable, Injector } from '@angular/core';
import { Datasource } from '@spryker/datasource';
import { Observable, of } from 'rxjs';

import { DatasourceInlineConfig, DependableDatasourceInlineContext } from './types';

@Injectable({
    providedIn: 'root',
})
export class DatasourceInlineService implements Datasource {
    resolve(injector: Injector, config: DatasourceInlineConfig, context?: DependableDatasourceInlineContext): Observable<unknown> {
        if (!config.dependsOnContext) {
            return of(config.data);
        }

        const key = context?.[config.dependsOnContext.contextKey];

        return of(config.data[key] ?? config.dependsOnContext.default);
    }
}
