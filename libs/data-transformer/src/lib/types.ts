import { Injector } from '@angular/core';
import { RegistryDeclaration, RegistryType } from '@spryker/utils';
import { Observable } from 'rxjs';

export interface DataTransformerRegistry {
    // pluck: DataTransformer
}

export type DataTransformerType = RegistryType<DataTransformerRegistry>;

export type DataTransformerTypesDeclaration = RegistryDeclaration<DataTransformerRegistry>;

export interface DataTransformerConfig {
    type: DataTransformerType;
    // Reserved for types that may have extra configuration
    [extraConfig: string]: unknown;
}

export interface DataTransformer<D, DT> {
    transform(data: D, config: DataTransformerConfig, injector?: Injector): Observable<DT | unknown>;
}
