import { Inject, Injectable, Injector, Optional } from '@angular/core';
import { InjectionTokenType } from '@spryker/utils';

import { TableDatasourceProcessorsToken } from './tokens';
import { TableDatasourceProcessorsDeclaration } from './types';

@Injectable({ providedIn: 'root' })
export class TableDatasourceProcessorService {
  private processorTypes: TableDatasourceProcessorsDeclaration = this.datasourceProcessors?.reduce(
    (processorTypes, preprocessorType) => ({
      ...processorTypes,
      ...preprocessorType,
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

  private getProcessorService(type: string): any {
    const processorClass = this.processorTypes[type];

    if (!processorClass) {
      throw new Error(
        `TableDatasourceProcessorService: Preprocessor type '${type}' is not registered!`,
      );
    }

    return this.injector.get(processorClass);
  }
}
