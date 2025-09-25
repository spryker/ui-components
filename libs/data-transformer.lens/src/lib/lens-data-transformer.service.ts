import { Injectable, inject } from '@angular/core';
import { DataTransformer, DataTransformerService } from '@spryker/data-transformer';
import { ContextService, mergeDeep } from '@spryker/utils';
import { Observable, map } from 'rxjs';

import { LensDataTransformerConfig, LensDataTransformerData, LensDataTransformerDataT } from './types';

@Injectable({
    providedIn: 'root',
})
export class LensDataTransformerService implements DataTransformer<LensDataTransformerData, LensDataTransformerDataT> {
    private contextService = inject(ContextService);
    private dataTransformerService = inject(DataTransformerService);

    transform(data: LensDataTransformerData, config: LensDataTransformerConfig): Observable<LensDataTransformerDataT> {
        const copiedData = mergeDeep({}, data);
        const paths = this.contextService.splitPath(config.path);
        const interpolatedData = this.contextService.interpolateExpression(config.path, copiedData as any);

        return this.dataTransformerService.transform(interpolatedData, config.transformer).pipe(
            map((currentData) => {
                if (paths.length > 1) {
                    const interpolatedPrevData = this.contextService.interpolateExpression(
                        this.contextService.cratePath(paths.slice(0, -1)),
                        copiedData as any,
                    ) as Record<string, unknown>;

                    interpolatedPrevData[paths[paths.length - 1]] = currentData;
                } else {
                    copiedData[config.path] = currentData;
                }

                return copiedData;
            }),
        );
    }
}
