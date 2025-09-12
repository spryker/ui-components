import { Injectable, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { NzModalRef, NzModalService, ModalOptions as NzModalOptions } from 'ng-zorro-antd/modal';

import { AnyModal, ModalOptions, ModalRef, ModalWrapperFactory, ModalWrapperRef } from '../../types';
import { NzModalWrapperComponent } from './nz-modal-wrapper/nz-modal-wrapper.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

function mapNzOptions(options: ModalOptions<AnyModal>): NzModalOptions {
    const nzOptions: NzModalOptions = {
        nzContent: NzModalWrapperComponent,
        nzAutofocus: null,
        nzFooter: null,
        nzMaskStyle: {
            background: 'none',
        },
        nzCloseIcon: undefined,
    };

    if (options.title) {
        nzOptions.nzTitle = options.title;
    }

    if (options.footer) {
        nzOptions.nzFooter = options.footer;
    }

    if (options.closeIcon) {
        nzOptions.nzCloseIcon = options.closeIcon as string | TemplateRef<void>;
    }

    if (options.width) {
        nzOptions.nzWidth = options.width;
    }

    if (options.closeable !== undefined) {
        nzOptions.nzClosable = options.closeable;
    }

    if (options.backdrop !== undefined) {
        nzOptions.nzMask = options.backdrop;
        nzOptions.nzMaskStyle = {
            background: undefined as any,
        };
    }

    if (options.class) {
        nzOptions.nzClassName = options.class;
    }

    if (options.wrapperClass) {
        nzOptions.nzWrapClassName = options.wrapperClass;
    }

    return nzOptions;
}

export class NzModalWrapperRef implements ModalWrapperRef {
    private destroyed$ = new Subject<void>();
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private onDispose = () => {};

    constructor(private nzModalRef: NzModalRef) {
        nzModalRef.afterClose.pipe(takeUntil(this.destroyed$)).subscribe(() => this.onDispose());
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setModalRef(modalRef: ModalRef<any, any>): void {}

    addModalOptions(options: ModalOptions<AnyModal>): void {
        const nzMappedOptions = mapNzOptions(options);
        const nzOptions = this.nzModalRef.getConfig();

        this.nzModalRef.updateConfig({
            ...nzOptions,
            ...nzMappedOptions,
            nzMaskStyle: {
                background: nzOptions.nzMask ? (undefined as any) : 'none',
            },
        });
    }

    getModalVcr(): ViewContainerRef {
        return this.nzModalRef.getContentComponent().contentVcr;
    }

    getInstance() {
        return this.nzModalRef.getContentComponent();
    }

    dispose(): void {
        this.destroyed$.next();
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
    private nzModalService = inject(NzModalService);

    createWrapper(options: ModalOptions<AnyModal>): ModalWrapperRef {
        const nzModalRef = this.nzModalService.create(mapNzOptions(options));

        return new NzModalWrapperRef(nzModalRef);
    }
}
