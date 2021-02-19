import { Injector } from '@angular/core';
import { Observable } from 'rxjs';

// tslint:disable-next-line: no-empty-interface
export interface DataTransformerRegistry {
  // pluck: DataTransformer
}

export type DataTransformerType = keyof DataTransformerRegistry extends never
  ? string
  : keyof DataTransformerRegistry;

export type DataTransformerTypesDeclaration = {
  [P in keyof DataTransformerRegistry]?: DataTransformerRegistry[P];
};

export interface DataTransformerConfig {
  type: DataTransformerType;
  // Reserved for types that may have extra configuration
  [extraConfig: string]: unknown;
}

export interface DataTransformer<D, DT> {
  transform(
    data: D,
    config: DataTransformerConfig,
    injector?: Injector,
  ): Observable<DT>;
}
