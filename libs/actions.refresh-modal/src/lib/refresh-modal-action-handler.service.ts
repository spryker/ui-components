import { Injectable, Injector } from '@angular/core';
import { ActionHandler } from '@spryker/actions';
import { ModalRef } from '@spryker/modal';
import { Observable, of } from 'rxjs';
import { RefreshModalActionConfig } from './types';

@Injectable({
    providedIn: 'root',
})
export class RefreshModalActionHandlerService implements ActionHandler<unknown, void> {
    handleAction(injector: Injector, config: RefreshModalActionConfig, context: unknown): Observable<void> {
        const modalRef = injector.get(ModalRef);
        modalRef.updateData(config.data);

        return of(void 0);
    }
}
