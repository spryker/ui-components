import { Injector } from '@angular/core';
import { RegistryDeclaration, RegistryType } from '@spryker/utils';
import { Observable } from 'rxjs';

// tslint:disable-next-line: no-empty-interface
export interface DataTransformerConfiguratorRegistry {}

export type DataTransformerConfiguratorType = RegistryType<
  DataTransformerConfiguratorRegistry
>;

export type DataTransformerConfiguratorDeclaration = RegistryDeclaration<
  DataTransformerConfiguratorRegistry
>;

export interface DataTransformerConfiguratorConfig {
  type: DataTransformerConfiguratorType;
  [prop: string]: unknown; // Extra configuration for specific types
}

export interface DataTransformerConfigurator<D> {
  resolve(injector: Injector): Observable<D>;
}
