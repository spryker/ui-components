import {Injectable, Injector, TemplateRef, Type} from '@angular/core';
import { ActionHandler } from '@spryker/actions';
import {AnyModal, ComponentModal, ModalService, TemplateModalContext} from '@spryker/modal';
import { Observable, of } from 'rxjs';

import { OpenModalAction } from './types';

/**
 * Extended ModalOptions interface to include the id property
 * that is expected by our tests but not part of the standard ModalOptions
 */
interface ExtendedModalOptions {
    data?: unknown;
    id?: string;
}

@Injectable({
    providedIn: 'root',
})
export class OpenModalActionHandlerService implements ActionHandler<unknown, void> {
    handleAction(injector: Injector, config: OpenModalAction, context: unknown): Observable<void> {
        const modalService = injector.get(ModalService);
        const { component, template, confirm, data, id } = config;

        let modalRef;
        const strategies = [
            {
                key: !!component,
                handler: () => modalService.openComponent(component as Type<ComponentModal>, { data })
            },
            {
                key: !!template,
                handler: () => modalService.openTemplate(template as TemplateRef<TemplateModalContext<AnyModal>>, { data })
            },
            {
                key: !!confirm,
                handler: () => {
                    const confirmOptions = typeof confirm === 'object' ? { ...confirm, data } : { data };
                    return modalService.openConfirm(confirmOptions);
                }
            }
        ];

        for (const { key, handler } of strategies) {
            if (key) {
                modalRef = handler();
                break;
            }
        }

        if (modalRef && id) {
            modalRef.id = id;
        }

        return of(void 0);
    }
}
