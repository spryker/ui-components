import { Inject, Injectable, OnDestroy, TemplateRef, Type } from '@angular/core';

import { ModalRefImpl, ModalRenderingFn } from './modal-ref';
import {
    ComponentModal,
    ComponentModalStrategy,
    ComponentModalStrategyOptions,
    ComponentModalExtras,
    ConfirmModalComponent,
    ConfirmModalStrategyOptions,
    TemplateModalContext,
    TemplateModalStrategy,
    TemplateModalExtras,
    ConfirmModalStrategy,
} from './strategies';
import { ModalOptionsToken, ModalWrapperFactoryToken } from './tokens';
import { AnyModal, ModalOptions, ModalRef, ModalStrategy } from './types';

@Injectable({ providedIn: 'root' })
export class ModalService implements OnDestroy {
    private modals = new Set<ModalRef<any, any>>();

    constructor(
        private modalWrapperFactory: ModalWrapperFactoryToken,
        @Inject(ModalOptionsToken) private defaultOptions: ModalOptions<any>,
    ) {}

    ngOnDestroy(): void {
        this.closeAll();
    }

    closeAll(): void {
        this.modals.forEach((modal) => modal.close());
        this.modals.clear();
    }

    getOpenModals(): ModalRef<any, any>[] {
        return Array.from(this.modals);
    }

    open<T extends AnyModal, TExtra>(
        strategy: ModalStrategy<T, TExtra>,
        options?: ModalOptions<T>,
    ): ModalRef<T, TExtra> {
        options = this.resolveOptions(options);

        const modalWrapperRef = this.modalWrapperFactory.createWrapper(options);

        const vcr = modalWrapperRef.getModalVcr();

        const renderFn: ModalRenderingFn<T> = (modal) => strategy.render(vcr, modal);

        const modalRef = new ModalRefImpl<T>(options?.data, renderFn, () => {
            modalWrapperRef.dispose();
            this.modals.delete(modalRef);
        });

        this.modals.add(modalRef);

        const renderingRef = renderFn(modalRef);

        modalRef.setRenderingRef(renderingRef);

        modalWrapperRef.onDisposed(() => modalRef.dispose());
        modalWrapperRef.setModalRef(modalRef);

        if (renderingRef.getModalOptions) {
            modalWrapperRef.addModalOptions(renderingRef.getModalOptions());
        }

        return modalRef;
    }

    openComponent<T extends ComponentModal>(
        component: Type<T>,
        options?: ModalOptions<T> & ComponentModalStrategyOptions,
    ): ModalRef<T, ComponentModalExtras<T>> {
        return this.open(new ComponentModalStrategy(component, options), options);
    }

    openTemplate<T extends AnyModal>(
        template: TemplateRef<TemplateModalContext<T>>,
        options?: ModalOptions<T>,
    ): ModalRef<T, TemplateModalExtras<T>> {
        return this.open(new TemplateModalStrategy(template), options);
    }

    openConfirm(
        options?: ModalOptions<ConfirmModalComponent> & ConfirmModalStrategyOptions,
    ): ModalRef<AnyModal, ComponentModalExtras<ConfirmModalComponent>> {
        return this.open(new ConfirmModalStrategy(options), options);
    }

    private resolveOptions(options?: ModalOptions<any>): ModalOptions<any> {
        return { ...this.defaultOptions, ...options };
    }
}
