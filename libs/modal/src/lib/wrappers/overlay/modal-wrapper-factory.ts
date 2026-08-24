import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ChangeDetectorRef, ComponentRef, Injectable, ViewContainerRef, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { AnyModal, ModalOptions, ModalRef, ModalWrapperFactory, ModalWrapperRef } from '../../types';
import { ModalWrapperComponent } from './modal-wrapper.component';

export class OverlayModalWrapperRef implements ModalWrapperRef {
    private destroyed$ = new Subject<void>();
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private onDispose = () => {};

    constructor(
        private overlayRef: OverlayRef,
        private componentRef: ComponentRef<ModalWrapperComponent>,
    ) {
        this.overlayRef
            .backdropClick()
            .pipe(takeUntil(this.destroyed$))
            .subscribe(() => this.onDispose());
    }

    setModalRef(modalRef: ModalRef<any, any>): void {
        this.componentRef.instance.setModalRef(modalRef);
    }

    addModalOptions(options: ModalOptions<AnyModal>): void {
        options = { ...options, ...this.componentRef.instance.options };
        this.componentRef.instance.setModalOptions(options);
        // `ComponentRef.changeDetectorRef` is a `ViewRef` over the *host root* LView, not the
        // component's own, so its `detectChanges()` is a no-op on an `OnPush` component once the
        // view has been checked once. Mark the component's own view instead.
        this.componentRef.injector.get(ChangeDetectorRef).markForCheck();
    }

    getModalVcr(): ViewContainerRef {
        return this.componentRef.instance.contentVcr;
    }

    getInstance(): ModalWrapperComponent {
        return this.componentRef.instance;
    }

    dispose(): void {
        // Refs cleanup requires assignment to `undefined`
        /* eslint-disable @typescript-eslint/no-non-null-assertion */

        this.destroyed$.next();
        this.overlayRef.dispose();
        this.overlayRef = undefined!;
        this.componentRef = undefined!;

        /* eslint-enable @typescript-eslint/no-non-null-assertion */
    }

    onDisposed(fn: () => void): void {
        this.onDispose = fn;
    }
}

@Injectable({ providedIn: 'root' })
export class OverlayModalWrapperFactory implements ModalWrapperFactory {
    protected overlay = inject(Overlay);

    private overlayPosition = this.overlay.position().global().centerHorizontally().centerVertically();

    createWrapper(options: ModalOptions<AnyModal>): ModalWrapperRef {
        const overlayRef = this.overlay.create({
            panelClass: options.wrapperClass,
            hasBackdrop: options.backdrop,
            width: options.width,
            positionStrategy: this.overlayPosition,
        });

        const wrapperPortal = new ComponentPortal(ModalWrapperComponent);
        const wrapperComponentRef = overlayRef.attach(wrapperPortal);

        wrapperComponentRef.instance.setModalOptions(options);

        return new OverlayModalWrapperRef(overlayRef, wrapperComponentRef);
    }
}
