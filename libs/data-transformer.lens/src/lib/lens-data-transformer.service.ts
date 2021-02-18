import { Injectable } from '@angular/core';
import {
  DataTransformer,
  DataTransformerService,
} from '@spryker/data-transformer';
import { ContextService } from '@spryker/utils';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  LensDataTransformerConfig,
  LensDataTransformerData,
  LensDataTransformerDataT,
} from './types';

@Injectable({
  providedIn: 'root',
})
export class LensDataTransformerService
  implements
    DataTransformer<LensDataTransformerData, LensDataTransformerDataT> {
  constructor(
    private contextService: ContextService,
    private dataTransformerService: DataTransformerService,
  ) {}

  transform(
    data: LensDataTransformerData,
    config: LensDataTransformerConfig,
  ): Observable<LensDataTransformerDataT> {
    const copiedData = JSON.parse(JSON.stringify(data));
    const paths = this.contextService.splitPath(config.path);
    const interpolatedData = this.contextService.interpolateExpression(
      config.path,
      copiedData as any,
    );

    return this.dataTransformerService
      .transform(interpolatedData, config.transformer)
      .pipe(
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
