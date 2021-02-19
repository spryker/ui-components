import { Injectable, Injector } from '@angular/core';
import { DataTransformerService } from '@spryker/data-transformer';
import { Observable } from 'rxjs';

import { DatasourceInlineConfig } from './types';

@Injectable({
  providedIn: 'root',
})
export class DatasourceInlineService {
  constructor(private dataTransformerService: DataTransformerService) {}

  resolve(
    injector: Injector,
    config: DatasourceInlineConfig,
  ): Observable<unknown> {
    return this.dataTransformerService.transform(
      config.data,
      config.transform,
      injector,
    );
  }
}
