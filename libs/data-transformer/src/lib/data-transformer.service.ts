import { Injectable, Injector, inject } from '@angular/core';
import { InjectionTokenType } from '@spryker/utils';
import { Observable } from 'rxjs';

import { DataTransformerTypesToken } from './token';
import {
    DataTransformer,
    DataTransformerConfig,
    DataTransformerRegistry,
    DataTransformerType,
    DataTransformerTypesDeclaration,
} from './types';

/**
 * Allows to declaratively apply various data transformations on any data structures.
 */
@Injectable({
    providedIn: 'root',
})
export class DataTransformerService {
    private injector = inject(Injector);
    private transformersTypes = inject<InjectionTokenType<typeof DataTransformerTypesToken>>(
        DataTransformerTypesToken,
        { optional: true },
    );

    private transformers: Partial<DataTransformerTypesDeclaration> =
        this.transformersTypes?.reduce(
            (transformers, transformer) => ({
                ...transformers,
                ...transformer,
            }),
            {},
        ) ?? {};

    transform(data: unknown, config: DataTransformerConfig, injector?: Injector): Observable<unknown> {
        if (!this.isTransformerRegisteredType(config.type)) {
            throw Error(`DataTransformerService: Unknown transformer type ${String(config.type)}`);
        }

        const transformer: DataTransformer<unknown, unknown> = this.injector.get(this.transformers[config.type]);

        return transformer.transform(data, config, injector ?? this.injector);
    }

    private isTransformerRegisteredType(type: DataTransformerType): type is keyof DataTransformerRegistry {
        return type in this.transformers;
    }
}
