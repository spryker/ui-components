import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import {
  NzModalRef,
  NzModalService,
  ModalOptions as NzModalOptions,
} from 'ng-zorro-antd/modal';

import {
  AnyModal,
  ModalOptions,
  ModalRef,
  ModalWrapperFactory,
  ModalWrapperRef,
} from '../../types';
import { NzModalWrapperComponent } from './nz-modal-wrapper/nz-modal-wrapper.component';

function getNzOptions(options: ModalOptions<AnyModal>): NzModalOptions {
  return {
    nzTitle: options.title,
    nzFooter: options.footer ?? null,
    nzCloseIcon: options.closeIcon as string | TemplateRef<void>,
    nzWidth: options.width,
    nzClosable: options.closeable,
    nzMask: options.backdrop,
    nzMaskStyle: {
      background: options.backdrop ? (undefined as any) : 'none',
    },
    nzClassName: options.class,
    nzWrapClassName: options.wrapperClass,
    nzContent: NzModalWrapperComponent,
    nzAutofocus: null,
  };
}

export class NzModalWrapperRef implements ModalWrapperRef {
  private onDispose = () => {};

  constructor(private nzModalRef: NzModalRef) {}

  setModalRef(modalRef: ModalRef<any, any>): void {}

  addModalOptions(options: ModalOptions<AnyModal>): void {
    const nzOptions = getNzOptions(options);
    this.nzModalRef.updateConfig(nzOptions);
  }

  getModalVcr(): ViewContainerRef {
    return this.nzModalRef.getContentComponent().contentVcr;
  }

  getInstance() {
    return this.nzModalRef.getContentComponent();
  }

  dispose(): void {
    this.nzModalRef.destroy();
  }

  onDisposed(fn: () => void): void {
    this.onDispose = fn;
  }
}

/**
 * Responsible to render modal wrapper from Ant Design and prepare a place for user content within it.
 */
@Injectable({
  providedIn: 'root',
})
export class NzModalWrapperFactory implements ModalWrapperFactory {
  constructor(private nzModalService: NzModalService) {}

  createWrapper(options: ModalOptions<AnyModal>): ModalWrapperRef {
    const nzModalRef = this.nzModalService.create(getNzOptions(options));

    return new NzModalWrapperRef(nzModalRef);
  }
}
