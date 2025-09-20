import { Injectable, Injector, inject } from '@angular/core';
import { Datasource, DatasourceService } from '@spryker/datasource';
import { Observable, of, switchMap } from 'rxjs';
import { DatasourceDependableConfig } from './types';
import { DatasourceDependableElementsService } from './datasource-dependable-elements.service';

@Injectable({
    providedIn: 'root',
})
export class DatasourceDependableService implements Datasource {
    private datasourceService = inject(DatasourceService);
    private datasourceDependableElementsService = inject(DatasourceDependableElementsService);

    resolve(injector: Injector, config: DatasourceDependableConfig, context?: unknown): Observable<unknown> {
        context = typeof context === 'object' ? { ...context } : {};

        return this.datasourceDependableElementsService.resolve(config.id).pipe(
            switchMap((element) => element.getValueChanges()),
            switchMap((value) => {
                if (value) {
                    context['value'] = value;

                    return this.datasourceService.resolve(injector, config.datasource, context);
                }

                return of(null);
            }),
        );
    }
}
