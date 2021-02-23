import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
import {
  RegistryType,
  GetFromRegistry,
  InferGeneric,
  Generics,
} from '@spryker/utils';

// tslint:disable-next-line: no-empty-interface
export interface ActionsRegistry {
  // type: ActionHandler
}

export type ActionType = RegistryType<ActionsRegistry>;

export interface ActionConfig {
  type: ActionType;
  // Reserved for types that may have extra configuration
  [k: string]: unknown;
}

export type InferAction<T extends ActionType> = GetFromRegistry<
  T,
  ActionsRegistry,
  ActionHandler
>;
export type InferActionContext<T extends ActionType> = InferGeneric<
  InferAction<T>,
  0
>;
export type InferActionReturn<T extends ActionType> = InferGeneric<
  InferAction<T>,
  1
>;

export interface ActionHandler<C = unknown, R = unknown>
  extends Generics<[C, R]> {
  handleAction(
    injector: Injector,
    config: ActionConfig,
    context: C,
  ): Observable<R>;
}
