import { Injectable, Injector, inject } from '@angular/core';
import { ActionTypesToken } from './token';
import {
    ActionConfig,
    ActionHandler,
    ActionsRegistry,
    ActionType,
    ActionTypesDeclaration,
    InferActionContext,
    InferActionReturn,
} from './types';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ActionsService {
    private injector = inject(Injector);
    private actionHandlers = inject(ActionTypesToken, { optional: true });

    private actionHandlerTypes: Partial<ActionTypesDeclaration> =
        this.actionHandlers?.reduce((actions, action) => ({ ...actions, ...action }), {}) || {};

    trigger<C extends ActionConfig>(
        injector: Injector,
        config: C,
        context: InferActionContext<C['type']>,
    ): Observable<InferActionReturn<C['type']>> {
        if (!this.isActionRegisteredType(config.type)) {
            throw Error(`ActionsService: Unknown action type ${config.type}`);
        }

        const actionHandler: ActionHandler<
            InferActionContext<C['type']>,
            InferActionReturn<C['type']>
        > = this.injector.get(this.actionHandlerTypes[config.type]);

        return actionHandler.handleAction(injector, config, context);
    }

    isActionRegisteredType(type: ActionType): type is keyof ActionsRegistry {
        return type in this.actionHandlerTypes;
    }
}
