import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  AnyModal,
  ModalOptions,
  ModalRef,
  ModalWrapperFactory,
  ModalWrapperRef,
} from '../../types';
import { ModalWrapperComponent } from './modal-wrapper.component';

export class OverlayModalWrapperRef implements ModalWrapperRef {
  private destroyed$ = new Subject<void>();
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onDispose = () => {};

  constructor(
    private overlayRef: OverlayRef,
    private componentRef: ComponentRef<ModalWrapperComponent>,
    closeOnBackDrop: boolean,
  ) {
    this.overlayRef
      .backdropClick()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        if (closeOnBackDrop) this.onDispose();
      });
  }

  setModalRef(modalRef: ModalRef<any, any>): void {
    this.componentRef.instance.setModalRef(modalRef);
  }

  addModalOptions(options: ModalOptions<AnyModal>): void {
    options = { ...options, ...this.componentRef.instance.options };
    this.componentRef.instance.setModalOptions(options);
    this.componentRef.changeDetectorRef.detectChanges();
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
  private overlayPosition = this.overlay
    .position()
    .global()
    .centerHorizontally()
    .centerVertically();

  constructor(private overlay: Overlay) {}

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

    return new OverlayModalWrapperRef(
      overlayRef,
      wrapperComponentRef,
      options.closeOnBackdrop,
    );
  }
}
