import { Injectable, Injector } from '@angular/core';
import { ActionHandler, ActionConfig } from '@spryker/actions';
import { ModalRef } from '@spryker/modal';
import { Observable, of } from 'rxjs';

import { CloseModalActionConfig } from './types';

@Injectable({
    providedIn: 'root',
})
export class CloseModalActionHandlerService implements ActionHandler<unknown, void> {
    handleAction(injector: Injector, config: CloseModalActionConfig, context: unknown): Observable<void> {
        const modalRef = injector.get(ModalRef);
        modalRef.close(config.result);

        return of(void 0);
    }
}
