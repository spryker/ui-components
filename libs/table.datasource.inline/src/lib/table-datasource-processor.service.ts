import { Inject, Injectable, Injector, Optional } from '@angular/core';
import { InjectionTokenType } from '@spryker/utils';

import { TableDatasourceProcessorsToken } from './tokens';
import {
  TableDatasourceProcessor,
  TableDatasourceProcessorsDeclaration,
} from './types';

/**
 * Collects {@link TableDatasourceProcessorsDeclaration} by {@link TableDatasourceProcessorsToken} and invoke methods.
 */
@Injectable({ providedIn: 'root' })
export class TableDatasourceProcessorService {
  private processorTypes: TableDatasourceProcessorsDeclaration = this.datasourceProcessors?.reduce(
    (allProcessorTypes, processorTypes) => ({
      ...allProcessorTypes,
      ...processorTypes,
    }),
    {},
  );

  constructor(
    private injector: Injector,
    @Optional()
    @Inject(TableDatasourceProcessorsToken)
    private datasourceProcessors: InjectionTokenType<
      typeof TableDatasourceProcessorsToken
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

  private getProcessorService(type: string): TableDatasourceProcessor {
    const processorType = this.processorTypes[type];

    if (!processorType) {
      throw new Error(
        `TableDatasourceProcessorService: Preprocessor type '${type}' is not registered!`,
      );
    }

    return this.injector.get(processorType);
  }
}
