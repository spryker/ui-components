import { TemplateRef, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';

export interface Modal<TData = never, TResult = never> {
  __capturedData: TData;
  __capturedResult: TResult;
}

export type AnyModal = Modal<any, any>;

export type InferModalData<T> = T extends Modal<infer Data, any> ? Data : never;
export type InferModalResult<T> = T extends Modal<any, infer Result>
  ? Result
  : never;

export interface ModalTemplateContext<T> {
  $implicit: ModalRef<T, any>;
}

export interface ModalOptions<T> {
  data?: InferModalData<T>;
  title?: string | TemplateRef<ModalTemplateContext<T>>;
  footer?: string | TemplateRef<ModalTemplateContext<T>>;
  closeIcon?: string | TemplateRef<ModalTemplateContext<T>>;
  width?: string | number;
  closeable?: boolean;
  backdrop?: boolean;
  closeOnBackdrop?: boolean;
  class?: string;
  wrapperClass?: string;
}

export abstract class ModalRef<T, TExtra = never> {
  id!: string;
  extras!: TExtra;
  abstract getData(): InferModalData<T> | undefined;
  abstract updateData(data: InferModalData<T>): void;
  abstract close(result?: InferModalResult<T>): void;
  abstract afterClosed(): Observable<InferModalResult<T>>;
  abstract afterCancelled(): Observable<void>;
  abstract afterDismissed(): Observable<InferModalResult<T> | undefined>;
  /** Re-render inner view of the modal */
  abstract reset(): void;
}

export interface ModalRenderingRef<T, TExtra = never> {
  updateData(data?: InferModalData<T>): void;
  getModalOptions?(): ModalOptions<T>;
  getExtras(): TExtra;
  dispose(): void;
}

export interface ModalStrategy<T, TExtra = never> {
  render(
    vcr: ViewContainerRef,
    modalRef: ModalRef<T, TExtra>,
  ): ModalRenderingRef<T, TExtra>;
}

export interface ModalWrapperRef {
  setModalRef(modalRef: ModalRef<any, any>): void;
  addModalOptions(options: ModalOptions<AnyModal>): void;
  getModalVcr(): ViewContainerRef;
  getInstance(): unknown;
  dispose(): void;
  onDisposed(fn: () => void): void;
}

export interface ModalWrapperFactory {
  createWrapper(options: ModalOptions<AnyModal>): ModalWrapperRef;
}
