import { Inject, Injectable, Injector } from '@angular/core';
import { InjectionTokenType, RegistryDeclaration } from '@spryker/utils';
import { ActionTypesToken } from './token';
import {
  ActionConfig,
  ActionHandler,
  ActionsRegistry,
  ActionType,
  InferActionContext,
  InferActionReturn
} from './types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActionsService {
  private actionHandlersObject: RegistryDeclaration<ActionsRegistry> =
    this.actionHandlers?.reduce(
      (actions, action) => ({ ...actions, ...action }),
      {},
    ) || {};

  constructor(
    private injector: Injector,
    @Inject(ActionTypesToken)
    private actionHandlers?: InjectionTokenType<typeof ActionTypesToken>,
  ) {}

  trigger<C extends ActionConfig>(
    injector: Injector,
    config: C,
    context: InferActionContext<C['type']>,
  ): Observable<InferActionReturn<C['type']>> {
    if (!this.isActionRegisteredType(config.type)) {
      throw Error(
        `ActionsService: Unknown action type ${config.type}`,
      );
    }

    const actionHandler: ActionHandler<InferActionContext<C['type']>, InferActionReturn<C['type']>> = this.injector.get(
      this.actionHandlersObject[config.type],
    );

    return actionHandler.handleAction(injector, config, context);
  }

  private isActionRegisteredType(
    type: ActionType,
  ): type is keyof ActionsRegistry {
    return type in this.actionHandlersObject;
  }
}
