import { Inject, Injectable, Injector, Optional } from '@angular/core';
import { InjectionTokenType } from '@spryker/utils';

import { DatasourceProcessorsToken } from './tokens';
import { DatasourceProcessor, DatasourceProcessorsDeclaration } from './types';

/**
 * Collects {@link DatasourceProcessorsDeclaration} by {@link DatasourceProcessorsToken} and invoke methods.
 */
@Injectable({ providedIn: 'root' })
export class DatasourceProcessorService {
  private processorTypes: DatasourceProcessorsDeclaration = this.datasourceProcessors?.reduce(
    (allProcessorTypes, processorTypes) => ({
      ...allProcessorTypes,
      ...processorTypes,
    }),
    {},
  );

  constructor(
    private injector: Injector,
    @Optional()
    @Inject(DatasourceProcessorsToken)
    private datasourceProcessors: InjectionTokenType<
      typeof DatasourceProcessorsToken
    >,
  ) {}

  preprocess(type: string, value: unknown): unknown {
    const processorService = this.getProcessorService(type);

    return processorService.preprocess(value);
  }

  postprocess(type: string, value: unknown): unknown {
    const processorService = this.getProcessorService(type);

    return processorService.postprocess(value);
  }

  private getProcessorService(type: string): DatasourceProcessor {
    const processorType = this.processorTypes[type];

    if (!processorType) {
      throw new Error(
        `TableDatasourceProcessorService: Preprocessor type '${type}' is not registered!`,
      );
    }

    return this.injector.get(processorType);
  }
}
