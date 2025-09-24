import { Injectable, Injector } from '@angular/core';
import { ActionHandler, ActionsService } from '@spryker/actions';
import { ModalService } from '@spryker/modal';
import { AnyContext, ContextService } from '@spryker/utils';
import { EMPTY, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ConfirmationActionConfig } from './types';

@Injectable({
    providedIn: 'root',
})
export class ConfirmationActionHandlerService implements ActionHandler {
    handleAction(injector: Injector, config: ConfirmationActionConfig, context?: unknown): Observable<unknown> {
        const modalService = injector.get(ModalService);
        const actionsService = injector.get(ActionsService);
        const contextService = injector.get(ContextService);
        const modalConfig = { ...config.modal };
        const modalTitle = modalConfig.title;
        const modalDescription = modalConfig.description;
        const modalOkText = modalConfig.okText;
        const modalCancelText = modalConfig.cancelText;

        if (modalTitle) {
            modalConfig.title = contextService.interpolate(String(modalTitle), context as AnyContext);
        }

        if (modalDescription) {
            modalConfig.description = contextService.interpolate(String(modalDescription), context as AnyContext);
        }

        if (modalOkText) {
            modalConfig.okText = contextService.interpolate(String(modalOkText), context as AnyContext);
        }

        if (modalCancelText) {
            modalConfig.cancelText = contextService.interpolate(String(modalCancelText), context as AnyContext);
        }

        return modalService
            .openConfirm(modalConfig)
            .afterDismissed()
            .pipe(
                switchMap((isConfirmed) =>
                    isConfirmed ? actionsService.trigger(injector, config.action, context) : EMPTY,
                ),
            );
    }
}
