import { InjectionToken, Injectable } from '@angular/core';

import { ModalWrapperFactory, AnyModal, ModalWrapperRef, ModalOptions } from './types';

export function defaultModalOptionsFactory(): ModalOptions<any> {
    return {
        backdrop: true,
    };
}

export const ModalOptionsToken = new InjectionToken<ModalOptions<any>>('ModalOptions', {
    providedIn: 'root',
    factory: defaultModalOptionsFactory,
});

@Injectable()
export abstract class ModalWrapperFactoryToken implements ModalWrapperFactory {
    abstract createWrapper(options: ModalOptions<AnyModal>): ModalWrapperRef;
}
