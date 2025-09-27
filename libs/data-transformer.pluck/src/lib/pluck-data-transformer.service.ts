import { Injectable, inject } from '@angular/core';
import { DataTransformer } from '@spryker/data-transformer';
import { ContextService } from '@spryker/utils';
import { Observable, of } from 'rxjs';

import { PluckDataTransformerConfig, PluckDataTransformerData, PluckDataTransformerDataT } from './types';

@Injectable({
    providedIn: 'root',
})
export class PluckDataTransformerService
    implements DataTransformer<PluckDataTransformerData, PluckDataTransformerDataT>
{
    private contextService = inject(ContextService);

    transform(
        data: PluckDataTransformerData,
        config: PluckDataTransformerConfig,
    ): Observable<PluckDataTransformerDataT> {
        return of(this.contextService.interpolateExpression(config.path, data as any));
    }
}
