import { EmbeddedViewRef, TemplateRef, ViewContainerRef } from '@angular/core';

import {
  InferModalData,
  ModalRef,
  ModalRenderingRef,
  ModalStrategy,
} from '../types';

export interface TemplateModalContext<T> {
  $implicit?: InferModalData<T>;
  modalRef: ModalRef<T>;
}

export interface TemplateModalExtras<T> {
  getViewRef(): EmbeddedViewRef<TemplateModalContext<T>>;
}

export class TemplateModalRenderingRef<T>
  implements
    ModalRenderingRef<T, TemplateModalExtras<T>>,
    TemplateModalExtras<T> {
  constructor(private viewRef: EmbeddedViewRef<TemplateModalContext<T>>) {}

  getViewRef() {
    return this.viewRef;
  }

  updateData(data: InferModalData<T>): void {
    this.viewRef.context.$implicit = data;
    this.viewRef.detectChanges();
  }

  getExtras(): TemplateModalExtras<T> {
    return this;
  }

  dispose(): void {
    // Refs cleanup requires assignment to `undefined`
    // tslint:disable: no-non-null-assertion

    this.viewRef.destroy();
    this.viewRef = undefined!;

    // tslint:enable: no-non-null-assertion
  }
}

export class TemplateModalStrategy<T>
  implements ModalStrategy<T, TemplateModalExtras<T>> {
  constructor(private template: TemplateRef<TemplateModalContext<T>>) {}

  render(vcr: ViewContainerRef, modalRef: ModalRef<T>) {
    const viewRef = vcr.createEmbeddedView<TemplateModalContext<T>>(
      this.template,
      { $implicit: modalRef.getData(), modalRef },
    );

    return new TemplateModalRenderingRef(viewRef);
  }
}
